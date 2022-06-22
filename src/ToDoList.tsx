import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/*
function ToDoList() {
	const [toDo, setToDo] = useState('');
	const [toDoError, setToDoError] = useState('');
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value }
		} = event;
		setToDoError('');
		setToDo(value);
	};
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (toDo.length < 10) {
			return setToDoError('To do should be longer');
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={toDo} placeholder="Write a to do" />
				<button>Add</button>
				{toDoError !== '' ? toDoError : null}
			</form>
		</div>
	);
}
*/

const Register = styled.input`
	width: 200px;
	height: 30px;
	margin: auto;
`;

const AddButton = styled.button`
	width: 50px;
	height: 30px;
	background-color: green;
	border-radius: 10px;
	border: 0;
	margin: auto;
`;

function ToDoList() {
	const { register, handleSubmit, formState } = useForm();
	const onValid = (data: any) => {
		console.log(data);
	};
	console.log(formState.errors);
	return (
		<div>
			<form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
				<Register {...register('email', { required: true })} placeholder="Email" />
				<Register {...register('firstName', { required: true })} placeholder="First Name" />
				<Register {...register('lastName', { required: true })} placeholder="Last Name" />
				<Register {...register('username', { required: true, minLength: 10 })} placeholder="Username" />
				<Register {...register('password', { required: true, minLength: 5 })} placeholder="Password" />
				<Register
					{...register('password1', {
						required: 'Password is required',
						minLength: {
							value: 5,
							message: 'Your password is too short.'
						}
					})}
					placeholder="Password1"
				/>
				<AddButton>Add</AddButton>
			</form>
		</div>
	);
}

export default ToDoList;
