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
	/* margin: auto; */
`;

const AddButton = styled.button`
	width: 50px;
	height: 30px;
	background-color: green;
	border-radius: 10px;
	border: 0;
	/* margin: auto; */
`;

interface IForm {
	email: string;
	firstname: string;
	lastname: string;
	username: string;
	password: string;
	password1: string;
	extraError?: string;
}

function ToDoList() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<IForm>({
		defaultValues: {
			email: '@naver.com'
		}
	});

	const onValid = (data: IForm) => {
		if (data.password !== data.password1) {
			setError('password1', { message: 'Password are not the same' }, { shouldFocus: true });
		}
		setError('extraError', { message: 'Server offline.' });
	};

	console.log(errors);
	return (
		<div>
			<form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
				<Register
					{...register('email', {
						required: 'Email is required',
						pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed' }
					})}
					placeholder="Email"
				/>
				<span>{errors?.email?.message}</span>
				<Register
					{...register('firstname', {
						required: 'Write here',
						validate: {
							noNico: value => (value.includes('nico') ? 'no nicos allowed' : true),
							noNick: value => (value.includes('nick') ? 'no nick allowed' : true)
						}
					})}
					placeholder="First Name"
				/>
				<span>{errors?.firstname?.message}</span>
				<Register {...register('lastname', { required: 'Write here' })} placeholder="Last Name" />
				<span>{errors?.lastname?.message}</span>
				<Register {...register('username', { required: 'Write here', minLength: 10 })} placeholder="Username" />
				<span>{errors?.username?.message}</span>
				<Register {...register('password', { required: 'Write here', minLength: 5 })} placeholder="Password" />
				<span>{errors?.password?.message}</span>
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
				<span>{errors?.password1?.message}</span>
				<AddButton>Add</AddButton>
				<span>{errors?.extraError?.message}</span>
			</form>
		</div>
	);
}

export default ToDoList;
