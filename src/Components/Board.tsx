import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbledCard from './DragabbleCard';

const Wreapper = styled.div`
	padding: 20px 10px;
	padding-top: 10px;
	background-color: ${props => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
	background-color: ${props => (props.isDraggingOver ? 'pink' : props.isDragginFromThis ? 'red' : 'blue')};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
	toDos: string[];
	boardId: string;
}

interface IAreaProps {
	isDraggingOver: boolean;
	isDragginFromThis: boolean;
}

function Board({ toDos, boardId }: IBoardProps) {
	return (
		<Wreapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(magic, info) => (
					<Area
						isDraggingOver={info.isDraggingOver}
						isDragginFromThis={Boolean(info.draggingFromThisWith)}
						ref={magic.innerRef}
						{...magic.droppableProps}
					>
						{toDos.map((toDo, index) => (
							<DragabbledCard key={toDo} toDo={toDo} index={index} />
						))}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wreapper>
	);
}
export default Board;
