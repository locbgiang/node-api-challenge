const router = require('express').Router();

const actionDataBase = require('./actionModel');
const projectDataBase = require('./projectModel');

//getting an action with given ACTION id ----------DONE------------
router.get('/:id',validateActionId, (req,res)=>{
    const id = req.params.id;
    actionDataBase.get(id).then(data=>{
        res.status(200).json(data);
    }).then(err=>{
        console.log(err);
        res.status(500).json({
            error: "unable to display actions",
        });
    });
});

//adding an action to a project with given PROJECT id----------DONE-------
router.post('/:id', validateProjectId, validateAction, (req,res)=>{
    const id = req.params.id;
    const action = {project_id: id, ...req.body}
    actionDataBase.insert(action).then(data=>{
        res.status(201).json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: 'unable to add action',
        })
    })
})

//updating an action with a given ACTION id---------DONE---------
router.put('/:id', validateActionId,validateAction,(req,res)=>{
    const id = req.params.id;
    actionDataBase.update(id, req.body).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: "unable to update action",
        })
    })
})

//deleting action with a given ACTION id----------DONE----------
router.delete('/:id', validateActionId, (req,res)=>{
    const id = req.params.id;
    actionDataBase.remove(id).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: 'unable to delete action',
        })
    })
})



//middleware

//make sure PROJECT id is valid ----------DONE--------
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

//make sure ACTION id is valid------------DONE-----------
function validateActionId(req,res,next){
    const id = req.params.id;
    actionDataBase.get(id).then(data=>{
        if(!data){
            res.status(400).json({
                message: 'invalid action id',
            })
        } else {
            next();
        }
    })
}

//make sure the action is valid --------------DONE---------
function validateAction(req,res,next){
    if(!req.body.description || !req.body.notes){
        res.status(400).json({
            message: "Please provide description and note for the action",
        })
    } else {
        next();
    }
}

module.exports = router;