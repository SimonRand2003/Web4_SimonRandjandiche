import React, { ReactNode } from 'react';

interface Props {
    name: string;
    description: string;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    addEdit: string;
    nameErrorMessage?: string;
    descriptionErrorMessage?: string;
    errorMessage?: string ;

}

const AddGenreForm: React.FC<Props> = ({
                                           name,
                                           description,
                                           handleSubmit,
                                           setName,
                                           setDescription,
                                           addEdit,
                                           nameErrorMessage,
                                           descriptionErrorMessage,
                                           errorMessage
                                       }) => {

    return (
        <form onSubmit={handleSubmit} noValidate={true}>
            <div className="form-group">
                {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage.split('\n').map((error, index) =>
                            <span key={index}>{error}<br /></span>
                        )}
                    </div>
                }
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {nameErrorMessage && (
                    <div className="alert alert-danger">{nameErrorMessage}</div>
                )}

            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                    {descriptionErrorMessage && (
                        <div className="alert alert-danger">{descriptionErrorMessage}</div>
                    )}

            </div>
            <button type="submit" className="btn btn-primary">
                {addEdit}
            </button>
        </form>
    );
};

export default AddGenreForm;
