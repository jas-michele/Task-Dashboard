import React from "react";
import type { TaskItemsProps, TaskStatus } from "../../types";

export const TaskItem: React.FC<TaskItemsProps> = ({
    task,
    onStatusChange,
    onDelete,
    onEdit
}) => {
    return (
        <div className="item">
            <div className="item-header">
                <h3>{task.title}</h3>
                <button onClick={() => onDelete(task.id)}>Delete</button>
                <button onClick={() => onEdit(task)}>Edit</button>
            </div>
            <p>{task.description}</p>
            <div className="item-footer">
                <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <span className={`priority ${task.priority}`}>Priority: {task.priority}</span>
                <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
            </div>
        </div>
    )
}
