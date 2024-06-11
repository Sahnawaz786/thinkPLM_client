import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import task from './Task.module.css';

const Task = () => {
  const navigate = useNavigate();
  return (
    <div className={task.taskContainer}>

      <div className={task.Header}>
        <p className={task.para}>Supplier Onboarding Task</p>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Task Name</th>
              <th>Task Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>1</td>
              <td style={{cursor:'pointer'}} onClick={()=>navigate('/suppliers')}>Supplier table</td>
              <td>OnBoarding Supplier Process</td>
              <td>Prequalification</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className={task.comments}>
        <span>Comments</span>
        <textarea id="simpleTextarea" name="simpleTextarea" rows="10" cols="50"></textarea>
      </div>

      <div className={task.approve}>
        <div className={task.options}>
          <input type="radio" id="approve" name="decision" value="approve" />
          <span>Approve</span>

        </div>
        <div className={task.options}>
          <input type="radio" id="reject" name="decision" value="reject" />
          <span >Reject</span>

        </div>

      </div>

      <div className={task.btn}>
        <Button variant="success">Success</Button>{' '}
      </div>

    </div>
  )
}

export default Task
