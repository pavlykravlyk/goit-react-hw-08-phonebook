// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// import { Spinner } from '../../components/Spinner';
// import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice';

// export const EditPostForm = ({ match }) => {
//   const { postId } = match.params;
//   const { data: post } = useGetPostQuery(postId);
//   const [updatePost, { isLoading }] = useEditPostMutation();
//   const [title, setTitle] = useState(post.title);
//   const [content, setContent] = useState(post.content);
//   const history = useHistory();
//   const onTitleChanged = e => setTitle(e.target.value);
//   const onContentChanged = e => setContent(e.target.value);
//   const onSavePostClicked = async () => {
//     if (title && content) {
//       await updatePost({ id: postId, title, content });
//       history.push(`/posts/${postId}`);
//     }
//   };
//   const spinner = isLoading ? <Spinner text="Saving..." /> : null;
//   return (
//     <section>
//       <h2>Edit Post</h2>
//       <form>
//         <label htmlFor="postTitle">Post Title:</label>
//         <input
//           type="text"
//           id="postTitle"
//           name="postTitle"
//           placeholder="What's on your mind?"
//           value={title}
//           onChange={onTitleChanged}
//           disabled={isLoading}
//         />
//         <label htmlFor="postContent">Content:</label>
//         <textarea
//           id="postContent"
//           name="postContent"
//           value={content}
//           onChange={onContentChanged}
//           disabled={isLoading}
//         />
//       </form>
//       <button type="button" onClick={onSavePostClicked} disabled={isLoading}>
//         Save Post
//       </button>
//       {spinner}
//     </section>
//   );
// };

// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import {
//   useAddContactMutation,
//   useGetAllContactsQuery,
// } from 'redux/contacts/contact-api';
// import FORM_CONFIG from './contactFormConfig';
// import { toast } from 'react-toastify';
// import { TailSpin } from 'react-loader-spinner';
// import {
//   ContactFormTitle,
//   ContactForm,
//   ContactFormList,
//   ContactFormItem,
//   ContactFormLabel,
//   ContactFormInput,
//   AddContactButton,
// } from './ContactForm.styled';

const EditContactForm = () => {
  //   const initialState = { name: '', number: '' };
  //   const [contact, setContact] = useState(initialState);
  //   const { data: allContacts } = useGetAllContactsQuery();
  //   const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
  //     useAddContactMutation();
  //   const handleInputChange = ({ target: { name, value } }) =>
  //     setContact(state => ({ ...state, [name]: value }));
  //   const handleFormSubmit = event => {
  //     event.preventDefault();
  //     allContacts.some(({ name }) => name === contact.name)
  //       ? toast.error(`${contact.name} is already in contacts`)
  //       : addContact(contact);
  //   };
  //   useEffect(() => {
  //     isAdded && toast.success(`${contact.name} has successfully added`);
  //     setContact(initialState);
  //   }, [isAdded]);
  //   useEffect(() => {
  //     isError && toast.error(`${contact.name} can't be added`);
  //   }, [isError]);
  return (
    <>
      <form></form>
      {/* <ContactFormTitle>create</ContactFormTitle>
        <ContactForm onSubmit={handleFormSubmit}>
          <ContactFormList>
            {FORM_CONFIG.map(
              ({ type, name, placeholder, pattern, title, required }) => (
                <ContactFormItem key={name}>
                  <ContactFormLabel>
                    {name}
                    <ContactFormInput
                      type={type}
                      title={title}
                      name={name}
                      placeholder={placeholder}
                      pattern={pattern}
                      required={required}
                      value={contact[name]}
                      onChange={handleInputChange}
                    />
                  </ContactFormLabel>
                </ContactFormItem>
              ),
            )}
          </ContactFormList>
          <AddContactButton disabled={isAdding}>add contact</AddContactButton>
        </ContactForm>
        {isAdded && <Navigate to="/contacts" />} */}
    </>
  );
};

// FORM_CONFIG.PropTypes = {
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   pattern: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   required: PropTypes.bool.isRequired,
// };

export default EditContactForm;
