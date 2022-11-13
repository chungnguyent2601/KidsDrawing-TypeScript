import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassesParent } from "../../store/models/classes_parent.interface";
import { IClassesParentState, IStateType } from "../../store/models/root.interface";
import "./ClassParentList.css"

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesParent) => void;
    children?: React.ReactNode;
};


function ClassDoingList1(props: classTeacherListProps): JSX.Element {
    const classes_parents: IClassesParentState = useSelector((state: IStateType) => state.classes_parents);


    const history = useHistory();
    const routeChange = (classes_parent: IClassesParent) => {
        let path = '/student/classes-doing';
        localStorage.removeItem('teacher_id');
        localStorage.setItem('teacher_id', classes_parent.teacher_id.toString())
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', classes_parent.student_id.toString())
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', classes_parent.id.toString());
        history.push({
            pathname: path,
        });
    }

    return (
        <Fragment>
            {
                classes_parents.classes_doing.map((contest, index) => {
                    return (
                        <>
                            <div className="courses-container" key={`lesson_${contest.id}`} onClick={() => { routeChange(contest) }}>
                                <div className="course">
                                    <div className="course-preview">
                                        <h6>Course</h6>
                                        <h2>JavaScript Fundamentals</h2>
                                        <a href="/#">View all chapters <i className="fas fa-chevron-right"></i></a>
                                    </div>
                                    <div className="course-info">
                                        <div className="progress-container">
                                            <div className="progress"></div>
                                            <span className="progress-text">
                                                6/9 Challenges
                                            </span>
                                        </div>
                                        <h6>Chapter 4</h6>
                                        <h2>Callbacks & Closures</h2>
                                        <button className="btn-x">Continue</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }

            <div className="d-flex justify-content-end text-right mt-2">
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous" href="/" onClick={(e) => e.preventDefault()}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {
                            Array.from(Array((10)).keys()).map((ele, idx) => {
                                return (
                                    <li className="page-item"><a className="page-link" href="/" onClick={() => { }}>{ele + 1}</a></li>
                                )
                            })
                        }
                        <li className="page-item">
                            <a className="page-link" aria-label="Next" href="/" onClick={(e) => e.preventDefault()}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Fragment>
    );
}

export default ClassDoingList1;
