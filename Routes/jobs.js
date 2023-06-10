const {Router} =require('express')
const pool = require('../config/db')
const router =Router()

////       Add Job
router.post('/add',async(req,res)=>{
    try {
        const newJob= await pool.query(
            `insert into job (title) values ($1) returning *`,
            [req.body.title]);
            res.status(201).json(newJob.rows)
    } catch (error) {
       res.status(500).json({message:error.message})
    }
})
////      Read Job
router.get('/',async(req,res)=>{
    try {
        const jobs = await pool.query('select * from job');
        res.status(200).json(jobs.rows)        
    } catch (error) {
       res.status(500).json({message:error.message})
    }
})

//// Delete Job
router.delete('/:id',async(req,res)=>{
    try {
        await pool.query('delete from employer where job_id=$1',[req.params.id]);
        await pool.query('delete from job where id=$1',[req.params.id]);
        res.status(200).json('Deleted job and employer')    
    } catch (error) {
        res.status(500).json({message:error.message})       
    }
})

module.exports = router
