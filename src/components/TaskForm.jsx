import React from 'react';
import { Formik } from 'formik';
import './Form.css';
import * as Yup from 'yup';
import Error from './Error';
import { Input, DatePicker, Button, Form, Upload } from 'antd';
import moment from 'moment';
// import ImageField from './ImageField';

const validationSchema = Yup.object().shape({
	title: Yup.string().required('Must enter a title'),
	description: Yup.string().required('Must give a description'),
	dueDate: Yup.string().required('Must give a due date')
});

const { TextArea } = Input;
function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function disabledDate(current) {
	// Can not select days before today and today
	return current && current < moment().endOf('day');
}
function disabledDateTime() {
	return {
		disabledHours: () => range(0, 24).splice(4, 20),
		disabledMinutes: () => range(30, 60),
		disabledSeconds: () => [ 55, 56 ]
	};
}



const TaskForm = ({ handleValues, fetchedValues, updateValues, closeModal }) => {
	return (
		<Formik
			initialValues={{
				title: Object.keys(fetchedValues).length > 0 ? fetchedValues.title : '',
				description: Object.keys(fetchedValues).length > 0 ? fetchedValues.description : '',
				dueDate:
					Object.keys(fetchedValues).length > 0
						? moment(fetchedValues.dueDate)
						: moment('00:00:00', 'HH:mm:ss')
			}}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				Object.keys(fetchedValues).length > 0
					? updateValues({ ...values, id: fetchedValues.id })
					: handleValues({ ...values, id: Math.floor(Math.random() * 100) });
				setSubmitting(true);
				resetForm();
				closeModal();
			}}
		>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
				<form>
					<div className="form-field">
						<label htmlFor="name">Title</label>
						<Input
							type="text"
							placeholder="Enter the title"
							id="title"
							name="title"
							onChange={handleChange}
							value={values.title}
							onBlur={handleBlur}
						/>
						{errors.title ? <Error message={errors.title} /> : null}
					</div>
					<div className="form-field">
						<label htmlFor="name">Description</label>
						<Input.TextArea
							type="text"
							placeholder="Describe your task"
							id="description"
							name="description"
							onChange={handleChange}
							value={values.description}
							onBlur={handleBlur}
							autoSize={true}
							maxLength={1000}
						/>
						{errors.description ? <Error message={errors.description} /> : null}
					</div>
					<div className="form-field">
						<label htmlFor="name">Due Date</label>
						<DatePicker
							format="YYYY-MM-DD HH:mm:ss"
							disabledDate={disabledDate}
							disabledTime={disabledDateTime}
							id="date"
							name="dueDate"
							onChange={(values, d) => setFieldValue('dueDate', d)}
							defaultValue={values.dueDate}
							onBlur={handleBlur}
						/>
						{errors.dueDate ? <Error message={errors.dueDate} /> : null}
					</div>
					 <div className="form-field">
						{/* <ImageField /> */}
					</div> 
					<div className="form-field">
						<Button type="primary" disable={isSubmitting} onClick={handleSubmit}>
							Submit
						</Button>
					</div>
					{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
				</form>
			)}
		</Formik>
	);
};

export default TaskForm;
