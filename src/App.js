import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsSheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[a-zA-Z0-9@.]+$/ && /^(?=.*\.)^(?=.*@)[a-zA-Z\d@.]*$/,
			'Адрес электронной почты должен содержать точку и хотя бы один символ "@", также адрес электронной почты не должен содержать пробелов, иных символов, кроме "@"',
		),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Z])(?=.*[!?#$%№&*])[a-zA-Z\d!?#$%№&*]*$/,
			'Пароль должен содержать хотя бы одну заглавную букву и хотя бы один из символов "!?#$%№&*"',
		)
		.min(7, 'Пароль не должен быть меньше 7 символов')
		.max(15, 'Пароль не должен быть больше 15 символов'),
	repeatedPassword: yup
		.string()
		.test('repeatedPasswordCheck', 'Пароли должны быть одинаковыми.', function (value) {
			return value === this.parent.password;
		}),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatedPassword: '',
		},
		resolver: yupResolver(fieldsSheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatedPasswordError = errors.repeatedPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	const checkIsButtonDisabled = (...errors) => {
		const booleanErrors = errors.map((error) => !!error);
		return booleanErrors.some((booleanError) => booleanError === true);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
				{repeatedPasswordError && (
					<div className={styles.errorLabel}>{repeatedPasswordError}</div>
				)}
				<input name="email" type="email" {...register('email')} />
				<input name="password" type="password" {...register('password')} />
				<input
					name="repeatedPassword"
					type="password"
					{...register('repeatedPassword')}
				/>
				<button
					type="submit"
					disabled={checkIsButtonDisabled(
						emailError,
						passwordError,
						repeatedPasswordError,
					)}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
