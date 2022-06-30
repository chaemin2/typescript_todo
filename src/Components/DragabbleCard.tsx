import { ButtonProps, Icon, IconButton } from '@mui/material';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	margin-bottom: 5px;
	padding: 10px 10px;
	background-color: ${props => (props.isDragging ? '#74b9ff' : props.theme.cardColor)};
	box-shadow: ${props => (props.isDragging ? '0px 2px 25px rgba(0,0,0,0.05)' : 'none')};
`;

const DeleteBtn = styled(IconButton)`
	width: 15px;
	height: 15px;
	float: right;
`;

interface iDraggabbleCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
	boardId: string;
}

function DragabbledCard({ toDoId, toDoText, index, boardId }: iDraggabbleCardProps) {
	const setToDos = useSetRecoilState(toDoState);
	// 리스트 삭제
	const onClick = () => {
		setToDos(allBoards => {
			const boardCopy = [...allBoards[boardId]];
			boardCopy.splice(index, 1);

			return {
				...allBoards,
				[boardId]: boardCopy
			};
		});
	};
	return (
		<Draggable draggableId={toDoId + ''} index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}
				>
					{toDoText}
					<DeleteBtn aria-label="delete" color="primary" onClick={onClick}>
						<DeleteIcon />
					</DeleteBtn>
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DragabbledCard);
