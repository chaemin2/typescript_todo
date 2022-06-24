import React from 'react';
import { selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, IToDo, toDoState } from './atoms';

export const ToDoBtn = styled.button`
	width: 50px;
	height: 17px;
	font-size: 11px;
	font-weight: bold;
	margin: 0px 2px;
	border: white solid 1px;
	border-radius: 5px;
	color: white;
	cursor: pointer;
	background-color: black;
	/* &:hover {
		background-color: #ea5959;
	} */
`;

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name }
		} = event;

		setToDos(oldToDos => {
			const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
			// const oldToDo = oldToDos[targetIndex];
			const newToDo = { text, id, category: name as any };

			return name !== Categories.DELETE
				? [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)]
				: [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
		});
	};

	// const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	const {
	// 		currentTarget: { name }
	// 	} = event;
	// 	setToDos(oldToDos => {
	// 		const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
	// 		// const oldToDo = oldToDos[targetIndex];
	// 		const newToDo = { text, id, category: name as any };

	// 		return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
	// 	});
	// };
	return (
		<li>
			<span style={{ margin: '0px 10px' }}>{text}</span>
			{category !== Categories.DOING && (
				<ToDoBtn name={Categories.DOING} onClick={onClick}>
					Doing
				</ToDoBtn>
			)}
			{category !== Categories.TO_DO && (
				<ToDoBtn name={Categories.TO_DO} onClick={onClick}>
					To Do
				</ToDoBtn>
			)}
			{category !== Categories.DONE && (
				<ToDoBtn name={Categories.DONE} onClick={onClick}>
					Done
				</ToDoBtn>
			)}
			<ToDoBtn name={Categories.DELETE} onClick={onClick}>
				삭제
			</ToDoBtn>
		</li>
	);
}

export default ToDo;
