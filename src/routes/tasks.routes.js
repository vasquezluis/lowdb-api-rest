import { Router } from "express";
import {
  countTasks,
  createTasks,
  deleteTasks,
  getTask,
  getTasks,
  updateTasks,
} from "../controllers/tasks.controller.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of the task
 *        name:
 *          type: string
 *          description: The task name
 *        description:
 *          type: string
 *          description: the task description
 *      example:
 *        id: 4f14e7e-c974-4047-9667-cf2951d7e6d1
 *        name: my first task
 *        description: I have to do something
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: the task id
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: the task api
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns a list of the tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *        description: the list of tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Task'
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *    summary: Get a task by Id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The task id
 *    responses:
 *      200:
 *        description: the task description by Id
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task does not found
 */
router.get("/tasks/:id", getTask);

/**
 * @swagger
 * /count/tasks:
 *  get:
 *    summary: get the total number of tasks
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: the total tasks
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 10
 */
router.get("/count/tasks", countTasks);

/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: create a new task
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the taks was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: Some server error
 */
router.post("/tasks", createTasks);

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *    summary: update a task by the id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the taks was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *      500:
 *        description: some server error
 */
router.put("/tasks/:id", updateTasks);

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *    summary: delete a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was deleted
 *      404:
 *        description: the task was not found
 *
 */
router.delete("/tasks/:id", deleteTasks);

export default router;
