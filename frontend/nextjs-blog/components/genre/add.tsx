import React from 'react';


interface Props {
    name: string;
    description: string;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    addEdit: string;
}

const AddGenreForm: React.FC<Props> = ({
                name,
                description,
                handleSubmit,
                setName,
                setDescription,
                addEdit
                                       }) => {


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
            </div>
            <button type="submit" className="btn btn-primary">
                {addEdit}
            </button>
        </form>
    );
};

export default AddGenreForm;
