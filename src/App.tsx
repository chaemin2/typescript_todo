import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 10px auto;
	justify-content: center;
	align-items: center;
	/* height: 100vh; */
`;

const Boards = styled.div`
	display: grid;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
`;

// const Form = styled.form`
// 	width: 100%;
// 	input {
// 		width: 100%;
// 	}
// `;

interface IForm {
	board: string;
}

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();

	const onDragEnd = (info: DropResult) => {
		const { draggableId, destination, source } = info;
		if (!destination) return;
		console.log(draggableId, destination, source);

		if (destination?.droppableId === source.droppableId) {
			// same board movement
			setToDos(allBoards => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: boardCopy
				};
			});
		}

		if (destination?.droppableId !== source.droppableId) {
			// same board movement
			setToDos(allBoard => {
				const sourceBoard = [...allBoard[source.droppableId]]; // 옮기기 전 상태
				const taskObj = sourceBoard[source.index]; // 옮길 대상
				const destinationBoard = [...allBoard[destination.droppableId]]; // 옮긴 후 상태
				sourceBoard.splice(source.index, 1); // 옮길 대상 삭제
				destinationBoard.splice(destination?.index, 0, taskObj); // 삭제된 값을 다시 추가
				return {
					...allBoard,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destinationBoard
				};
			});
		}
	};

	const onValid = ({ board }: IForm) => {
		console.log(board);
		// 새로운 BOARD 추가 ex)To Do, Doing, Done
		setToDos(allBoards => {
			return {
				...allBoards,
				[board]: []
			};
		});
		setValue('board', '');
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<form onSubmit={handleSubmit(onValid)}>
					<input {...register('board', { required: true })} type="text" placeholder={`Add Board`} />
				</form>
			</Wrapper>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map(boardId => (
						<Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}
export default App;
