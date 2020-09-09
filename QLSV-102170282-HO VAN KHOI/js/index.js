'use strict';

var students = [
    {
        mssv: 123467988,
        name: ' Nguyen Van A',
        email: ' abc@gmail.com',
        // gender: ' Nam'
    },
    {
        mssv: 123456789,
        name: ' abcdef',
        email: ' abc@gmail.com',
        // gender: ' Nữ'
    },
]

document.addEventListener('DOMContentLoaded', function () {
    renderStudents();
});
function emailIsValid(email)
{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

var editMode = false;
var studentIdTmp;

function enableEditMode() {
    editMode = true;
}

function disableEditMode() {
    editMode = false;
}

function isEditMode(){
    return editMode == true;
}

function renderStudents() {
    var html = '';

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        // var genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';

        html += '<li class="student">';
        html += '<p><span>MSSV: </span>' + student.mssv + '</p>';
        html += '<p><span>Name: </span>' + student.name + '</p>';
        html += '<p><span>Email: </span>' + student.email + '</p>';
        // html += '<p><span>Gender: </span>' + genderLabel + '</p>';
        html += '<i class="student-delete" onclick="onClickDeleteStudent(' + i + ')">X</i>';
        html += '<i class="student-edit" onclick="onClickEditStudent(' + i + ')">Edit</i>';
        html += '</li>';
    }
    setHTML('#students-list', html);
}

function setHTML(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}

function getInputStudents(selector) {
    return document.querySelector(selector).value;
}

function editStudentHandle() {
    var mssv = getInputStudents('.student-form .mssv');
    var name = getInputStudents('.student-form .name');
    var email = getInputStudents('.student-form .email');
    // var gender = getInputStudents('.student-form .gender');

    editStudent(studentIdTmp, {
        mssv: mssv,
        name: name,
        email: email,
        // gender: gender
    })
    renderStudents();
    disableEditMode();
    setHTML('.createStudent', 'Create');
    resetForm();     
}

function editStudent(index, student) {
    students[index] = student;
}

function onClickCreateStudent() {

    var mssv = getInputStudents('.student-form .mssv');
    var name = getInputStudents('.student-form .name');
    var email = getInputStudents('.student-form .email');
    // var gender = getInputStudents('.student-form .gender');

    // var gender = '';

    // if(document.getElementById('male').checked){
    //     gender = document.getElementById('male').value;
    // } else if(document.getElementById('female').checked){
    //     gender = document.getElementById('female').value;
    // }

    if(_.isEmpty(mssv)){
        mssv = '';
        document.getElementById('mssv-error').innerHTML = 'Bạn chưa nhập MSSV';
    } else if(mssv.trim().length!=9){
        mssv = '';
        document.getElementById('mssv-error').innerHTML = 'MSSV phải có 9 ký tự';
    } else{
        document.getElementById('mssv-error').innerHTML = '';
    }

    if(_.isEmpty(name)){
        name = '';
        document.getElementById('name-error').innerHTML = 'Vui lòng nhập họ và tên';
    } else if(name.trim().length<=2){
        name = '';
        document.getElementById('name-error').innerHTML = 'Tên phải lớn hơn 2 ký tự';
    }else if(name.trim().length>=50){
        name = '';
        document.getElementById('name-error').innerHTML = 'Tên phải nhỏ ký tự';
    } else{
        document.getElementById('name-error').innerHTML = '';
    }

    if(_.isEmpty(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
    } else if(!emailIsValid(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
    } else{
        document.getElementById('email-error').innerHTML = '';
    }

    // if(_.isEmpty(gender)){
    //     gender = '';
    //     document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính';
    // }else{
    //     document.getElementById('gender-error').innerHTML = '';
    // }

    // if(mssv && name && email && gender)
    if(mssv && name && email)
    {
        if (isEditMode()) {
            editStudentHandle();
        } else {
            addStudent({
                mssv: mssv,
                name: name,
                email: email,
                // gender: gender
            })
            renderStudents();
            resetForm();
        }
    }
    
}

function addStudent(student) {
    students.push(student);
}

function onClickDeleteStudent(index) {
    studentDelete(index);
    renderStudents();
}

function studentDelete(index) {
    students.splice(index, 1);
}

function setInputStudents(selector, value) {
    var element = document.querySelector(selector);
    element.value = value;
}


function onClickEditStudent(index) {
    studentIdTmp = index;

    var student = getStudent(index);
    setInputStudents('.student-form .mssv', student.mssv);
    setInputStudents('.student-form .name', student.name);
    setInputStudents('.student-form .email', student.email);
    // setInputStudents('.student-form .gender', student.gender);

    enableEditMode();
    setHTML('.createStudent', 'Save')
}

function getStudent(index) {
    return students[index];
}

function resetForm()
{
    setInputStudents('.student-form .mssv', '');
    setInputStudents('.student-form .name', '');
    setInputStudents('.student-form .email', '');
    // setInputStudents('.student-form .gender', '');
}

//***************************************************************************** */



