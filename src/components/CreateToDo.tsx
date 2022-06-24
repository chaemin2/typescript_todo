import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from './atoms';
import { ToDoBtn } from './ToDo';

interface IForm {
	toDo: string;
}
const AddBtn = styled(ToDoBtn)`
	background-color: #bf00dc;
	&:hover {
		background-color: #c641da;
	}
`;
function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const onSubmit = ({ toDo }: IForm) => {
		setToDos(oldToDos => [{ text: toDo, category, id: Date.now() }, ...oldToDos]);
		setValue('toDo', '');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register('toDo', {
					required: 'Please write a To Do'
				})}
				placeholder="Write a to do"
				style={{ marginLeft: '10px' }}
			/>
			<AddBtn>Add</AddBtn>
		</form>
	);
}

export default CreateToDo;
