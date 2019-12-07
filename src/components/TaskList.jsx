import React from 'react';
import Task from './Task';

const TaskList = (props) => {	
	return (
		<div>
			{props.tasks.map((task, index) => (
				<Task
					task={task}
					deleteCard={props.delete}
					openModal={props.edit}
					editingAvailable={props.makeEdit}
				// {task.isEditModeEnable == true ?'something': null}
				/>
			))}
		</div>
	);
};

export default TaskList;
