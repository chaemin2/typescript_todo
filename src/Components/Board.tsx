import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbledCard from './DragabbleCard';
import { IToDo, toDoState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Wreapper = styled.div`
	width: 300px;
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
	background-color: ${props =>
		props.isDraggingOver ? '#dfe6e9' : props.isDragginFromThis ? '#b2bec3' : 'transparent'};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;

const Form = styled.form`
	width: 100%;
	input {
		width: 100%;
	}
`;

interface IBoardProps {
	toDos: IToDo[];
	boardId: string;
}

interface IAreaProps {
	isDraggingOver: boolean;
	isDragginFromThis: boolean;
}

interface IForm {
	toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo
		};
		setToDos(allBoards => {
			return {
				...allBoards,
				[boardId]: [...allBoards[boardId], newToDo]
			};
		});
		setValue('toDo', '');
	};
	return (
		<Wreapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input {...register('toDo', { required: true })} type="text" placeholder={`Add task on ${boardId}`} />
			</Form>
			<Droppable droppableId={boardId}>
				{(magic, info) => (
					<Area
						isDraggingOver={info.isDraggingOver}
						isDragginFromThis={Boolean(info.draggingFromThisWith)}
						ref={magic.innerRef}
						{...magic.droppableProps}
					>
						{toDos.map((toDo, index) => (
							<DragabbledCard
								key={toDo.id}
								toDoId={toDo.id}
								toDoText={toDo.text}
								index={index}
								boardId={boardId}
							/>
						))}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wreapper>
	);
}
export default Board;
