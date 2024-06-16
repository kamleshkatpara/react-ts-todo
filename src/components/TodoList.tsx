import React, { useState } from 'react';
import Modal from './Modal';

export const TodoList: React.FC<{
    todos: { id: string; text: string }[];
    onEdit: (id: string, text: string) => void;
    onDelete: (id: string) => void;
}> = ({ todos, onEdit, onDelete }) => {
    const [editTodoId, setEditTodoId] = useState<string>('');
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [deleteTodoId, setDeleteTodoId] = useState<string>('');
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

    const handleEdit = (id: string, text: string) => {
        setEditTodoId(id);
        setEditModalVisible(true);
    };

    const handleEditSave = (text: string) => {
        onEdit(editTodoId, text);
        setEditTodoId('');
        setEditModalVisible(false);
    };

    const handleDelete = (id: string) => {
        setDeleteTodoId(id);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(deleteTodoId);
        setDeleteTodoId('');
        setDeleteModalVisible(false);
    };

    return (
        <>
            <ul className="list-group list-group-numbered">
                {todos.map((todo) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                        <div className="text-center flex-grow-1">{todo.text}</div>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-success bi bi-pencil-square flex-grow-1 me-2" onClick={() => handleEdit(todo.id, todo.text)}></button>
                            <button className="btn btn-sm btn-warning bi bi-trash flex-grow-1" onClick={() => handleDelete(todo.id)}></button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal
                show={editModalVisible}
                isEditing={true}
                onHide={() => setEditModalVisible(false)}
                onSave={handleEditSave}
                initialText={todos.find(todo => todo.id === editTodoId)?.text || ''}
            />

            <Modal
                show={deleteModalVisible}
                isEditing={false}
                onHide={() => setDeleteModalVisible(false)}
                onDelete={handleDeleteConfirm}
                initialText=""
            />
        </>
    );
};
