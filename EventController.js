'use strict';

eventsApp.controller('EventController',
    function EventController($scope) {

        console.log("hello");

        $scope.event = {
            sessions: [],
            iterations: [],
            previousIteration: [],
            currSes: null,
            clearState: 'Clear'
        }

        $scope.disTog = {
            togStatus: 'disabled',
            disBool: true,
            togText: false
        }


        $scope.setActive = setActive;
        $scope.saveAction = saveAction;
        $scope.clearAction = clearAction;
        $scope.addNote = addNote;
        $scope.createSes = createSes;
        $scope.deleteNote = deleteNote;
        $scope.mouseOver = mouseOver;
        $scope.save = save;
        $scope.load = load;
        $scope.addIter = addIter;
        $scope.back = back;
        $scope.forward = forward;
        $scope.clearFields = clearFields;
        $scope.setToggles = setToggles;
        $scope.setDeleteToggles = setDeleteToggles;
        $scope.setActiveText = setActiveText;
        $scope.setSessionText = setSessionText;
        $scope.deleteAction = deleteAction;



        function setActive(session) {
            clearStatus();
            $scope.event.currSes = session;
            setActiveHelper(session);
            setToggles();
            setActiveText(session);
            clearIterations();
            $scope.event.iterations.push($scope.event.text);
        }

        function saveAction() {
            if ($scope.event.title == '') {
                alert("Your note must have a title to save.");
            } else {
                setTextSave();
                save();
            }
        }


        function clearAction(state) {
            if (state == 'Clear') {
                clearFields();
                $scope.event.clearState = 'Revert';
            } else if (state == 'Revert') {
                $scope.event.title = $scope.event.currSes.title;
                $scope.event.text = $scope.event.currSes.desc;
                $scope.event.clearState = 'Clear';
            }
        }

        function addNote() {

            if ($scope.event.sessions.length > 0) {
                clearStatus();
            }

            var ses = createSes();
            $scope.event.currSes = ses;
            $scope.disTog.togText = true;
            $scope.event.sessions.push(ses);

            setToggles();
            setSessionText(ses);
            clearIterations();

            $scope.event.iterations.push('');
            save();
        }

        function clearStatus() {
            for (var i = 0; i < $scope.event.sessions.length; i++) {
                $scope.event.sessions[i].status = '';
            }
        }


        function createSes() {
            return {
                title: 'New Note',
                desc: '',
                status: 'active',
                color: 'default-color',
                cursor: 'list-cursor'
            };
        }



        function deleteNote() {
            var index = $scope.event.sessions.indexOf($scope.event.currSes);
            clearFields();
            deleteAction(index);

            if ($scope.event.sessions.length == 0) {
                setDeleteToggles();
            }
            save();

        }

        function mouseOver(session, bool) {
            if (bool == true) {
                session.color = 'hover-change';
            } else {
                session.color = 'default-color';
            }
        }

        function save() {
            localStorage.setItem('list', JSON.stringify($scope.event.sessions));
        };

        function load() {
            $scope.event.sessions = JSON.parse(localStorage.getItem('list')) || [];
            clearStatus();
            if ($scope.event.sessions.length != 0) {
                $scope.disTog.togText = true;
            }
        }


        function back() {
            if ($scope.event.iterations.length > 0) {
                $scope.event.text = $scope.event.iterations[$scope.event.iterations.length - 1];
                $scope.event.previousIteration.push($scope.event.iterations.pop());
            }
        }

        function forward() {
            if ($scope.event.previousIteration.length > 0) {
                $scope.event.text = $scope.event.previousIteration[$scope.event.previousIteration.length - 1];
                $scope.event.iterations.push($scope.event.previousIteration.pop());
            }
        }

        function addIter() {
            $scope.event.iterations.push($scope.event.text);
        }

        function clearFields() {
            $scope.event.title = '';
            $scope.event.text = '';
        }

        function setToggles() {
            $scope.disTog.disBool = false;
            $scope.disTog.togStatus = '';
        }

        function setDeleteToggles() {
            $scope.disTog.togStatus = 'disabled';
            $scope.disTog.disBool = true;
            $scope.disTog.togText = false;
        }

        function setActiveText(session) {
            $scope.event.title = session.title;
            $scope.event.text = session.desc;
        }

        function clearIterations() {
            $scope.event.iterations.length = 0;
            $scope.event.previousIteration.length = 0;
        }

        function setSessionText(ses) {
            $scope.event.title = ses.title;
            $scope.event.text = ses.desc;
        }

        function deleteAction(index) {
            $scope.event.sessions.splice(index, 1);
            $scope.disTog.togStatus = 'disabled';
            $scope.disTog.disBool = true;
            $scope.event.clearState = 'Clear';
        }

        function setTextSave() {
            $scope.event.currSes.title = $scope.event.title;
            $scope.event.currSes.desc = $scope.event.text;
            $scope.event.clearState = 'Clear';
        }

        function setActiveHelper(session) {
            session.status = 'active';
            $scope.event.clearState = 'Clear';
        }

        load();

    }

);

