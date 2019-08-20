// app.js
const express = require("express");
const parse = require('csv-parse')
const path = require('path');
const fs = require('fs');
const rl = require('readline');
const pathBuilder = require('./server/scripts/pathBuilder');
// const treeBuilder = require('./server/scripts/treeBuilder');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({dest:'uploads/'})

const mongoose = require('mongoose');
const Project = require('./models/projects.js')
const Project_version = require('./models/project_versions.js')

// const cors = require ('cors');
// Tell the bodyparser middleware to accept more data

app.use(express.static('client/js'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(require('cors')());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname+"/client/index.html")));

var options = {
  useNewUrlParser: true
};

mongoose.connect('mongodb://mongodb:27017/projects', options);
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
function addChildrens(currentNode){
    var children = [];
    // console.log(currentNode);
    for(i in nodes[currentNode].children){
        var nodeLocal ={};
        nodeLocal.text = nodes[nodes[currentNode].children[i]].text;
        nodeLocal.data = {};
        // nodeLocal.data.varName = nodeLocal.text;
        if ( nodes[nodes[currentNode].children[i]].initialPath){
          if(nodes[nodes[currentNode].children[i]].data){
            nodeLocal.data = nodes[nodes[currentNode].children[i]].data;
          }else{
            nodeLocal.data = {};
          }
          nodeLocal.data.initialPath =  nodes[nodes[currentNode].children[i]].initialPath;
          nodeLocal.data.externalKey =  nodes[nodes[currentNode].children[i]].externalKey;
          // nodeLocal.data.varName =  nodes[nodes[currentNode].children[i]].varName;
        }
        nodeLocal.children = addChildrens(nodes[currentNode].children[i]);
        if (nodeLocal.children.length == 0){
            nodeLocal.data.path = nodes[currentNode].children[i];
            // nodeLocal.data.externalKey =  nodes[nodes[currentNode].children[i]].externalKey;
            // nodeLocal.data.varName =  nodes[nodes[currentNode].children[i]].varName;
            // nodeLocal.text = nodeLocal.text + "("+nodes[nodes[currentNode].children[i]].variable+")";
        }
        children.push(nodeLocal);
        // console.log(nodes[currentNode].children[i]);
    }
    return children;
}

app.post('/save',function(req,res){
  console.log(`Building json file`);
  // console.log(req.body);
  var project_id = req.body.projectId;
  Project.findById(project_id)
    .catch(function (err){
      console.log(err);
    })
    .then(function (project){
      console.log(project);
      var dirPath = path.join(__dirname+'/data/'+project._id+'/');
      var current_version = project.current_version + 1;
      var versionFile = dirPath + current_version +'-modif.json';
      var modif = pathBuilder.buildPathFromJsTree(req.body.treeData);
      var blob = JSON.stringify(modif);
      console.log(`Done`);
      fs.writeFileSync(versionFile,blob,(err) =>{
         if (err) throw err;
      });
      project.current_version=current_version;
      project.version_date=Date.now();
      project.save()
      .then(project => {
        let project_version = new Project_version({
          version_number: project.current_version,
          project_id: project._id
        })
        project_version.save()
          .then(project_version => {
            console.log('saved!!!!!!!!!!!!!!!!');
            res.status(200).json({'project': project,"returned_version":current_version,'message':"Project saved"});
            }
          )
          .catch(err => {
              res.status(400).send('Saving new version failed');
          });
      })
      .catch(err => {
          res.status(400).send('Saving new version failed');
      });
      // fs.writeFileSync(fileVersion,'{"version":'+version+',"project":"'+project+'"}',(err) =>{
      //    if (err) throw err;
      // });

    })
  // var version = parseInt(req.body.version);
  // var fileVersion = filePath+'.version';
  // var versionFile = JSON.parse(fs.readFileSync(fileVersion));
  // version = version + 1;

  // console.log(filePath);
  // var fileVersion = filePath + ".version";
  // console.log(fileVersion);
  // console.log(fileName);
})

app.get('/build',function(req,res){
  var project_id = req.query.projectId;
  Project.findById(project_id)
    .catch(function (err){
      console.log(err);
    })
    .then(function (project){
      var version =req.query.version;
      var dir = path.join(__dirname+'/data/'+project._id+'/');
      var fileMappingPath =dir+project.access_id;

      if (fs.existsSync(fileMappingPath)) {
        var fileStream = fs.createReadStream(fileMappingPath)
        var modifPath = dir + version +'-modif.json';

        // console.log(modifPath,fs.existsSync(modifPath));

        var pathModifs = [];

        var tree = []
        var level = [];
        nodes = [];
        var rootNode = [];

        if (fs.existsSync(modifPath)) {
            var modifs = JSON.parse(fs.readFileSync(modifPath))
            // console.log(modifs);
            for( i in modifs){
              // console.log(modifs[i].before);
              pathModifs[modifs[i].externalKey] = modifs[i].after;
            }
            // console.log(pathModifs);
        }
        var lineReader = rl.createInterface({
          input: fileStream
        });
        var n = 0;
        var fileDef;
        lineReader.on('line', function (line) {
          var newLine = line;
          if (n> 0){
            var externalKey = (line.split(",")[0]) ?line.split(",")[0].replace(/\"/g,'') : "";
            var path = (line.split(",")[1]) ? line.split(',')[1].replace(/\"/g,'') : "";
            // console.log(pathModifs[line.split(',')[5].replace(/\"/g,'')]);
             if (pathModifs[externalKey]){
               newLine = newLine.replace(path,pathModifs[externalKey]);
             }
             fileDef += "\n" + newLine.replace(/((,[^,]*){3})(,[^,]*)(,[^,]*)*$/,"$1$3");
             // console.log(newLine);
            }else{
              // console.log(newLine);
              fileDef = newLine.replace(/((,[^,]*){3})(,[^,]*)(,[^,]*)*$/,"$1$3");
            }
            n++
        })
        .on('close', function(){
          res.send(fileDef);
        });
      }
    })

  // var project =req.query.project;


});


app.get('/projects',function(req,res){
  Project.find({},function(err, projects) {
      if (err) {
          console.error(err);
      } else {
          res.json(projects);
      }
  });
  // fs.readdir(path.join(__dirname+'/data/'), function(err, items) {
  //   console.log(items);
  //   var projects = [];
  //   for (var i=0; i<items.length; i++) {
  //       var file = path.join(__dirname+'/data/'+items[i]);
  //       if (fs.statSync(file).isDirectory()){
  //         let project={};
  //         project._id=items[i];
  //         project.project_name=items[i];
  //         projects.push(project);
  //       }
  //   }
  //   res.send(projects)
  // });
});

app.delete('/project/:projectId',function(req,res){
  console.log('delete',req.params.projectId);
  let projectId=req.params.projectId;
  let filter = {_id: projectId};
  let update = {status:"deleted"};
  Project.findOneAndUpdate(filter,update,function(err, projects) {
      if (err) {
          console.error(err);
      } else {
          res.json({message: projectId + " deleted successfully"});
      }
  });
  // fs.readdir(path.join(__dirname+'/data/'), function(err, items) {
  //   console.log(items);
  //   var projects = [];
  //   for (var i=0; i<items.length; i++) {
  //       var file = path.join(__dirname+'/data/'+items[i]);
  //       if (fs.statSync(file).isDirectory()){
  //         let project={};
  //         project._id=items[i];
  //         project.project_name=items[i];
  //         projects.push(project);
  //       }
  //   }
  //   res.send(projects)
  // });
});

app.get('/project',function(req,res){
    var project_id = req.query.project;
    var chosenVersion = req.query.version;
    Project.findById(project_id)
      .catch(function (err){
        console.log(err);
      })
      .then(function (project){
        data={};
        console.log('ok project',project);

        // Set Filepathes for project
        var dir = path.join(__dirname+'/data/'+project._id+'/');
        var fileMappingPath =dir+project.access_id;

        // Set version to retrieve (depends on the query)
        let versionToRetrieve;
        var lastVersion=project.current_version;
        if (chosenVersion != -1 && chosenVersion < lastVersion){
          versionToRetrieve =chosenVersion;
        } else {
          versionToRetrieve=lastVersion;
        }

        var version_date=project.version_date;

        // Set Version file path
        if (versionToRetrieve > 0){
          var modifPath = path.join(__dirname+'/data/'+project._id+'/'+versionToRetrieve+'-modif.json');
        }

        if (fs.existsSync(fileMappingPath)) {
          // var fileVersion = dir+'.version';
          //
          // if (!fs.existsSync(fileVersion)) {
          //   fs.writeFileSync(fileVersion,'{"version":0,"project":"'+project+'"}',(err) =>{
          //     if (err) throw err;
          //   });
          // }
          // version = JSON.parse(fs.readFileSync(fileVersion));
          // console.log(version);
          // console.log(version.version);
          // console.log(version.project);


          // console.log("lastVersion ==>" + lastVersion);
          // if(v != -1 && v <version.version){
          //   version.version =v;
          // }

          // if (version.version > 0){
          //   var modifPath = path.join(__dirname+'/data/'+project+'/'+version.version+'-modif.json');
          // }

          var fileStream = fs.createReadStream(fileMappingPath);

          console.log('modifPath',modifPath);

          var pathModifs = [];

          var tree = []
          var level = [];
          nodes = [];
          var rootNode = [];
          // var project_id = "test";
          if (fs.existsSync(modifPath)) {
              var modifs = JSON.parse(fs.readFileSync(modifPath))
              for( i in modifs){
                // console.log(modifs[i].before);
                if (modifs[i].before != modifs[i].after){
                  pathModifs[modifs[i].externalKey] = modifs[i].after;
                }
              }
              // console.log(pathModifs);
          }
          var lineReader = rl.createInterface({
            input: fileStream
          });

          var n = 0;
          let titles = [];
          const input = '"key_1","key_2"\n"value 1","value 2"'
          lineReader.on('line', function (line) {
            let nodeData = {}
            // console.log(line);
            n ++;
            if (n === 1){
              console.log("parser",line);
              titles = line.split(",");
              test = []
              parser = parse({
                delimiter :","
              }, function (err,records){
                console.log("test");
                console.log("parser",records[0]);
              })
              parser.write(line + "\n")
              parser.end()
              // console.log(titles,titles.length);
              if(titles.length < 3){
                console.log('should close');
                lineReader.close();
              }
            }else{
                titles.forEach((title,index) =>{
                nodeData[title] = line.split(",")[index].replace(/\"/g,'');
              })
            }

            var externalKey = (line.split(",")[0]) ?line.split(",")[0].replace(/\"/g,'') : "";
            var path = (line.split(",")[1]) ? line.split(',')[1].replace(/\"/g,'') : "";
            var varName = (line.split(",")[7]) ? line.split(",")[7].replace(/\"/g,'') : "";

            // studyIdentifier = line.split(";")[4].replace(/\"/g,'') + ".p" + line.split(';')[13].replace(/\"/g,'');

            // console.log(varIdentifier);

            // console.log(path);
            var initialPath = path

            if (pathModifs[externalKey]){
              // if(! pathModifs[path].includes("MESA_Exam1Main")){
              // console.log("Match ==> " + path +" " +pathModifs[path] );
              path = pathModifs[externalKey];
              // }
            }
            // console.log(path);
            // var variable = line.split(",")[6];
            var splitPaths = path.split("\\");
            var curentPath = "\\";


            for(i in splitPaths){
              if (i> 0 && splitPaths[i] != "" ){
                var text =splitPaths[i];
                var priorPath = curentPath;
                curentPath += text+"\\";
                if (i == 1 && !rootNode.includes(curentPath)){
                  rootNode.push(curentPath);
                }
                if(!nodes[curentPath]){
                    var node ={};
                    node.text = text;
                    node.children = [];
                    node.externalKey = externalKey;
                    if(nodeData){
                      // console.log(nodeData);
                      node.data = nodeData;
                    }
                    if(curentPath == path){
                      node.initialPath = initialPath;
                      // console.log("intitial path " + initialPath);
                    }
                    // node.variable = variable
                    nodes[curentPath] = node;
                }
                if(nodes[priorPath]){
                  if(!nodes[priorPath].children.includes(curentPath)){
                    nodes[priorPath].children.push(curentPath);
                  }
                }
              }
            }
          }).on('close', function(){
              lineReader.close();
              // console.log(tree);
              // console.log(nodes);
              for (i in rootNode){
                  var node ={};
                  node.text = nodes[rootNode[i]].text;
                  // node.data.initialPath = nodes[rootNode[i]].initialPath;
                  // console.log(nodes[rootNode[i]]);

                  // node.data.varName=node.text;
                  if (nodes[rootNode[i]].initialPath){
                    if(nodes[rootNode[i]].data){
                      node.data = nodes[rootNode[i]].data;
                    }else{
                     node.data = {};
                    }
                    node.data.initialPath = nodes[rootNode[i]].initialPath;
                    node.data.externalKey =  nodes[rootNode[i]].externalKey;
                    node.data.path = rootNode[i];
                  }
                  console.log('node',node);
                  node.children = addChildrens(rootNode[i]);
                  tree.push(node);
              }


              // console.log(tree[0].children);
              data.tree =[];
              data.tree = tree;
              data.project = project;
              data.returned_version = versionToRetrieve;
              // console.log(data.retruned_version);
              // data.project_name = studyIdentifier;
              // data.lastVersion = lastVersion;
              // console.log("lastVersion ==>" + lastVersion);

              res.send(data);
          });
        }else{
          version = {};
          version.project = project;
          version.version = -1;
          version.tree = [{text:"Pas de mapping"}];
          version.studyId = "";
          version.lastVersion = lastVersion;
          res.send(version);
        }
    });
  });



    // var version ={};
    // console.log(project);



app.post('/files',upload.single('file'),function(req,res){
  let uploadFile = req.file
  console.log(uploadFile);
  res.status(200).send(uploadFile.filename);
});

app.post('/project/new',function(req,res){
  // console.log(req.body);
  let project = new Project(req.body);
  console.log(project);
  let dirpath = path.join(__dirname+'/data/'+project._id);
  ensureDirSync(dirpath);
  if(project.access_id){
    fs.rename(__dirname+'/uploads/'+project.access_id,__dirname+'/data/'+project._id+"/"+project.access_id,function (err) {
        if (err) {
          console.error(err);
        }
    });
  }


  project.save()
  .then(project => {
    console.log('saved!!!!!!!!!!!!!!!!');
      let project_version = new Project_version({
        version_number: project.current_version,
        project_id: project._id
      })
      project_version.save()
      res.status(200).json({'project_id': project._id,'message':"Project add"});
  })
  .catch(err => {
      res.status(400).send('adding new project failed');
  });
});

function ensureDirSync (dirpath) {
  try {
    fs.mkdirSync(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

app.get('/project/versions',function(req,res){
  var project_id = req.query.project_id;
  Project.findById(project_id)
  Project_version.find({project_id:{$eq:project_id}},function(err, project_versions) {
      if (err) {
          console.error(err);
      } else {
          res.json(project_versions);
      }
  });
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`);
});
