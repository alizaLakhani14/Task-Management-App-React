import React, { Component } from 'react';
import { Form, Upload, Button, Icon } from 'antd';

class ImageField extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};
	render() {
		// const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Form.Item label="Upload" extra="longgggggggggggggggggggggggggggggggggg">
					{/* {getFieldDecorator('upload', {
						valuePropName: 'fileList',
						getValueFromEvent: this.normFile
					})( */}
					(
					<Upload name="logo" action="/upload.do" listType="picture">
						<Button>
							<Icon type="upload" /> Click to upload
						</Button>
					</Upload>
					)}
				</Form.Item>
			</div>
		);
	}
}

export default ImageField;
