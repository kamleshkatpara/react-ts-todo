import React, { useState, useEffect } from 'react';

interface ModalProps {
    show: boolean;
    isEditing: boolean;
    initialText?: string;
    onHide: () => void;
    onSave?: (text: string) => void;
    onDelete?: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, isEditing, initialText, onHide, onSave, onDelete }) => {

    const [text, setText] = useState<string>(initialText || '');

    useEffect(() => setText(initialText || ''), [initialText]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

    const handleConfirm = () => {
        if (isEditing && onSave) {
            onSave(text);
        } else if (!isEditing && onDelete) {
            onDelete();
        }
        onHide();
    };

    return (
        <div>
            <div className={`modal fade ${show ? 'show' : ''}`} id="staticBackdrop" style={{ display: show ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isEditing ? 'Edit Todo' : 'Confirm Delete'}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
                        </div>
                        <div className="modal-body">
                            {isEditing ? (
                                <input type="text" className="form-control" value={text} onChange={handleInputChange} />
                            ) : (
                                <p>Are you sure you want to delete this item?</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleConfirm}>{isEditing ? 'Save' : 'Yes'}</button>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default Modal;
