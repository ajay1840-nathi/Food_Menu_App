import { React, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, addDoc, Timestamp } from 'firebase/firestore'

import '../css/AddMeal.css'


const AddMeal = () => {

    const navigate = useNavigate();
    const [preview, setPreview] = useState()
    const [userDetails, setUserDetails] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            title: '',
            summary: '',
            instructions: '',
            file: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            title: Yup.string().required('Required'),
            summary: Yup.string().required('Required'),
            instructions: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const fileData = values.file;
                const fileBase64 = await convertBlobToBase64(fileData);

                addDoc(collection(db, 'menu'), {
                    name: values.name,
                    email: values.email,
                    title: values.title,
                    summary: values.summary,
                    instructions: values.instructions,
                    file: fileBase64,
                    createdTime: Timestamp.fromDate(new Date())
                })

            } catch (err) {
                alert(err)
            }
            resetForm();
            formik.file = ""
            navigate('/listing')

        },
    });

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
        });
    };
    const handleChange = (e) => {
        formik.setFieldValue('file', e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserDetails(data);
                    formik.setFieldValue('name', data.name || '');
                    formik.setFieldValue('email', data.email || '');
                    console.log(data);
                } else {
                    console.log("User document does not exist");
                }
            } else {
                console.log("User is not logged in");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <header className="meal_header">
                <h1>Share your <span className="add_highlight">favorite meal</span></h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <form onSubmit={formik.handleSubmit}>
                <div className='form_row'>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            readOnly={userDetails ? true : false}
                            required
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Your Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            readOnly={userDetails ? true : false}
                            required
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        required
                        className='format_input'
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Short Summary</label>
                    <input
                        type="text"
                        name="summary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.summary}
                        className='format_input'
                        required
                    />
                    {formik.touched.summary && formik.errors.summary ? (
                        <div className="error">{formik.errors.summary}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Instructions</label>
                    <textarea spellCheck="true" lang='en'
                        name="instructions"
                        onChange={formik.handleChange}
                        onPressEnter={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.instructions}
                        required
                    ></textarea>
                    {formik.touched.instructions && formik.errors.instructions ? (
                        <div className="error">{formik.errors.instructions}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Your Image</label>
                    <div className='img_container'>
                        {preview ? <img src={preview} className='img_preview' alt='imgs' /> : <h5 className='img_preview'>No image picked yet!</h5>}

                        <div className="file">
                            <label htmlFor="file-input">Pick an Image</label>
                            <input type="file" id="file-input" className='format_img' onChange={handleChange} accept="image/png,image/jpeg" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-button">Share Meal</button>
            </form>
        </div>
    )
}

export default AddMeal