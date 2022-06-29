import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	margin-bottom: 5px;
	padding: 10px 10px;
	background-color: ${props => (props.isDragging ? 'tomato' : props.theme.cardColor)};
	box-shadow: ${props => (props.isDragging ? 'px 2px 5px rgba(0,0,0,0.1)' : 'none')};
`;

interface iDraggabbleCardProps {
	toDo: string;
	index: number;
}

function DragabbledCard({ toDo, index }: iDraggabbleCardProps) {
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}
				>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DragabbledCard);
