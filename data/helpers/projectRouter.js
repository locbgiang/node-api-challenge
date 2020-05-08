const router = require('express').Router();

const projectDataBase = require('./projectModel');

//getting a project with given id -------------DONE--------------
router.get('/:id', validateProjectId, (req,res)=>{
    const id = req.params.id;
    projectDataBase.get(id).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: 'unable to fetch data for project',
        })
    })
});

//adding new project------------DONE------------------
router.post('/', validateProject, (req,res)=>{
    projectDataBase.insert(req.body).then(data=>{
        res.status(201).json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: "unable to add new project",
        })
    })
})

//updating a project with new data ---------------DONE-----------
router.put('/:id', validateProjectId,validateProject,(req,res)=>{
    const id = req.params.id;
    projectDataBase.update(id, req.body).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: 'cannot change project',
        })
    })
})

//removing project with given id -------------DONE--------------
router.delete('/:id', validateProjectId,(req,res)=>{
    const id = req.params.id;
    projectDataBase.remove(id).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: 'unable to delete project',
        })
    })
})

//displaying actions with given project id------------DONE---------------
router.get('/:id/actions',validateProjectId,(req,res)=>{
    const id = req.params.id;
    projectDataBase.getProjectActions(id).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: 'cannot display actions'
        })
    })
})

//middleware

//make sure id is valid -------------DONE-----------
function validateProjectId(req,res,next){
    const id = req.params.id;
    projectDataBase.get(id).then(data=>{
        if(!data){
            res.status(400).json({
                message: 'invalid project id',
            })
        } else {
            next();
        }
    })
}

//make sure project is valid ------------DONE-------------
function validateProject(req,res,next){
    if(!req.body.name || !req.body.description){
        res.status(400).json({
            message: "Please provide name and description for the project"
        })
    } else {
        next();
    }
}


module.exports = router;