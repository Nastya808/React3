const RegistrationForm = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        specialization: [],
        position: ''
    });

    const [errors, setErrors] = React.useState({});
    const [submittedData, setSubmittedData] = React.useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prevData) => {
                if (checked) {
                    return { ...prevData, specialization: [...prevData.specialization, value] };
                } else {
                    return { ...prevData, specialization: prevData.specialization.filter(s => s !== value) };
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Логин обязателен.";
        if (!formData.password) newErrors.password = "Пароль обязателен.";
        if (formData.password.length < 3 || formData.password.length > 10) {
            newErrors.password = "Пароль должен содержать от 3 до 10 символов.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Пароль и подтверждение не совпадают.";
        }
        if (!formData.gender) newErrors.gender = "Выберите пол.";
        if (formData.specialization.length === 0) newErrors.specialization = "Выберите хотя бы одну специализацию.";
        if (!formData.position) newErrors.position = "Выберите должность.";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setSubmittedData(formData);
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Логин:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    <label>
                        Пароль:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div>
                    <label>
                        Подтверждение пароля:
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </label>
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <div>
                    <label>Пол:</label>
                    <label>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="male" 
                            checked={formData.gender === 'male'} 
                            onChange={handleChange} 
                        />
                        Мужской
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="female" 
                            checked={formData.gender === 'female'} 
                            onChange={handleChange} 
                        />
                        Женский
                    </label>
                    {errors.gender && <p>{errors.gender}</p>}
                </div>
                <div>
                    <label>Специализация:</label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="specialization" 
                            value="web_developer" 
                            checked={formData.specialization.includes('web_developer')} 
                            onChange={handleChange} 
                        />
                        Веб-разработчик
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="specialization" 
                            value="data_scientist" 
                            checked={formData.specialization.includes('data_scientist')} 
                            onChange={handleChange} 
                        />
                        Специалист по данным
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            name="specialization" 
                            value="designer" 
                            checked={formData.specialization.includes('designer')} 
                            onChange={handleChange} 
                        />
                        Дизайнер
                    </label>
                    {errors.specialization && <p>{errors.specialization}</p>}
                </div>
                <div>
                    <label>
                        Должность:
                        <select name="position" value={formData.position} onChange={handleChange}>
                            <option value="">Выберите должность</option>
                            <option value="junior">Junior</option>
                            <option value="middle">Middle</option>
                            <option value="senior">Senior</option>
                        </select>
                    </label>
                    {errors.position && <p>{errors.position}</p>}
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>

            {submittedData && (
                <div>
                    <h3>Введённые данные:</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Логин:</td>
                                <td>{submittedData.username}</td>
                            </tr>
                            <tr>
                                <td>Пароль:</td>
                                <td>{submittedData.password}</td>
                            </tr>
                            <tr>
                                <td>Пол:</td>
                                <td>{submittedData.gender}</td>
                            </tr>
                            <tr>
                                <td>Специализация:</td>
                                <td>{submittedData.specialization.join(', ')}</td>
                            </tr>
                            <tr>
                                <td>Должность:</td>
                                <td>{submittedData.position}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<RegistrationForm />, document.getElementById('root'));
