import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import 'antd/dist/antd.css';
import { Modal, Button, Layout, Icon } from 'antd';
import TaskList from './components/TaskList';
import PaginationCount from './components/PaginationCount';

class App extends Component {
	state = {
		visible: false,
		// tasks: [
		// 	{ title: 'hello', description: 'world', dueDate: '', id: 1 },
		// 	{ title: 'hello1', description: 'world1', dueDate: '', id: 2 },
		// 	{ title: 'hello2', description: 'world2', dueDate: '', id: 3 },
		// 	{ title: 'hello3', description: 'world3', dueDate: '', id: 4 },
		// 	{ title: 'hello4', description: 'world4', dueDate: '', id: 5 },
		// 	{ title: 'hello5', description: 'world5', dueDate: '', id: 6 },
		// 	{ title: 'hello6', description: 'world6', dueDate: '', id: 7 },
		// 	{ title: 'hello7', description: 'world7', dueDate: '', id: 8 },
		// 	{ title: 'hello8', description: 'world8', dueDate: '', id: 9 },
		// 	{ title: 'hello9', description: 'world9', dueDate: '', id: 10 },
		// 	{ title: 'hello10', description: 'world10', dueDate: '', id: 11 },
		// 	{ title: 'hello11', description: 'world11', dueDate: '', id: 12 },
		// 	{ title: 'hello12', description: 'world2', dueDate: '', id: 13 }
		// ],
		tasks: localStorage.getItem('myTasks' || []),
		fetchedObject: {},
		currentPage: 1,
		tasksPerPage: 10
	};

	componentDidMount() {
		localStorage.setItem('myTasks', this.state.tasks);
	}
	// Open or Close Modal
	toggleModal = () => {
		this.setState({
			visible: !this.state.visible
		});
	};

	// Handle values after form Submission
	handleValues = (values) => {
		this.setState({
			tasks: [ ...this.state.tasks, values ]
		});
		// localStorage.setItem('myTasks', this.state.tasks)
		// console.log(this.state.tasks);
	};

	// For deleting task
	handleDelete = (id) => {
		this.setState({
			tasks: this.state.tasks.filter((task) => task.id !== id)
		});
	};

	// Enabling Edit
	makeEdit = (id) => {
		let edit = this.state.tasks.find((task) => task.id === id);
		this.setState({
			fetchedObject: { ...edit }
		});
	};

	// Updating values after editing
	handleValueUpdate = (values) => {
		this.setState({
			tasks: this.state.tasks.map((element) => {
				if (element.id === values.id) {
					return { ...values };
				}
				return element;
			}),
			fetchedObject: {}
		});
	};

	// Pagination functionality
	handleChange = (page) => {
		this.setState({
			currentPage: page
		});
	};

	render() {
		const indexOfLastTask = this.state.currentPage * this.state.tasksPerPage;
		const indexOfFirstTask = indexOfLastTask - this.state.tasksPerPage;
		const currentTasks = this.state.tasks.slice(indexOfFirstTask, indexOfLastTask);
		console.log(this.state.tasks);
		return (
			<Layout className="layout-style">
				<header>
					<h1>Task Management App</h1>
				</header>
				<div className="main">
					<Modal
						footer={null}
						title="Create Task"
						visible={this.state.visible}
						onOk={this.handleOk}
						onCancel={this.toggleModal}
						destroyOnClose={true}
					>
						<TaskForm
							handleValues={this.handleValues}
							fetchedValues={this.state.fetchedObject}
							updateValues={this.handleValueUpdate}
							closeModal={this.toggleModal}
						/>
					</Modal>

					<TaskList
						tasks={currentTasks}
						delete={this.handleDelete}
						edit={this.toggleModal}
						makeEdit={this.makeEdit}
					/>
				</div>
				<div className="add-button">
					<Button
						type="primary"
						onClick={this.toggleModal}
						className="add-button"
						shape="circle"
						size="large"
					>
						<Icon type="plus" />
					</Button>
				</div>
				{this.state.tasks.length > 0 ? (
					<div className="pagination">
						<PaginationCount
							tasks={this.state.tasks}
							tasksPerPage={this.state.tasksPerPage}
							changePage={this.handleChange}
						/>
					</div>
				) : null}
			</Layout>
		);
	}
}

export default App;
