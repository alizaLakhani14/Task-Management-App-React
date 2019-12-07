import React from 'react';
import { Pagination } from 'antd';

const PaginationCount = ({ tasks, tasksPerPage, changePage}) => {
	
	return (
		<div>
			<Pagination defaultCurrent={1} total={tasks.length} onChange={(num) => {
                changePage(num)
            }}/>,
		</div>
	);
};

export default PaginationCount;
