import React from 'react';
import './Task.css';
import { Card, Button, Icon } from 'antd';

const Task = ({ task, deleteCard, openModal, editingAvailable }) => {
	return (
		<Card title={task.title} style={{ width: 300 }} className="Task">
			<p>{`Description: ${task.description}`}</p>
			<p>{`DueDate: ${task.dueDate}`}</p>
			<img src={task.image} alt="img" />
			<Button
				type="primary"
				shape="circle"
				ghost={true}
				className="button"
				onClick={() => {
					openModal();
					editingAvailable(task.id);
				}}
			>
				<Icon type="edit" theme="twoTone" twoToneColor="#0000ff" />
			</Button>
			<Button type="danger" shape="circle" onClick={() => deleteCard(task.id)} ghost={true} className="button">
				<Icon type="delete" theme="twoTone" twoToneColor="#ff0000" />
			</Button>
		</Card>
	);
};

export default Task;
