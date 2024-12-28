const request = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const { setupTestDB } = require('./setup');

setupTestDB();

describe('Blog API', () => {
  let server;

  beforeAll(() => {
    const testSetup = setupTestDB();
    server = testSetup.getServer();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('POST /blogs', () => {
    it('should create a new blog', async () => {
      const newBlog = {
        title: 'Test Blog',
        body: 'This is a test blog body',
        description: 'This blog is all about me',
        status: 'published'
      };

      const res = await request(app)
        .post('/blogs')
        .send(newBlog)
        .expect(201);

      expect(res.body.message).toBe('Blog created successfully');
      expect(res.body.blog).toHaveProperty('_id');
      expect(res.body.blog.title).toBe(newBlog.title);
      expect(res.body.blog.body).toBe(newBlog.body);
      expect(res.body.blog.description).toBe(newBlog.description);
      expect(res.body.blog.status).toBe(newBlog.status);
      expect(res.body.blog).toHaveProperty('reading_time');
    });
  });

  describe('GET /blogs', () => {
    it('should get all blogs', async () => {
      const res = await request(app)
        .get('/blogs')
        .expect(200);

      expect(res.body.message).toBe('Get Blogs Successfully');
      expect(res.body.blogs).toBeInstanceOf(Array);
    });
  });

  describe('GET /blogs/:id', () => {
    it('should get a blog by id', async () => {
      const blog = await Blog.create({
        title: 'Test Blog',
        body: 'This is a test blog body',
        reading_time: 1,
        author: 'testauthorid',
        description: 'This is the blog',
        status: 'published'
      });

      const res = await request(app)
        .get(`/blogs/${blog._id}`)
        .expect(200);

      expect(res.body.message).toBe('Get Blog By Id successfully');
      expect(res.body.blog).toHaveProperty('_id', blog._id.toString());
    });

    it('should return 404 if blog not found', async () => {
      const res = await request(app)
        .get('/blogs/invalidid')
        .expect(404);

      expect(res.body.error).toBe('Blog not found');
    });
  });

  describe('PUT /blogs/:id', () => {
    it('should update a blog', async () => {
      const blog = await Blog.create({
        title: 'Test Blog',
        body: 'This is a test blog body',
        reading_time: 1,
        author: 'testauthorid',
        description: 'This is the blog',
        status: 'published'
      });

      const updatedBlog = {
        title: 'Updated Blog',
        body: 'This is an updated blog body',
        description: 'This is the blog',
        status: 'published'
      };

      const res = await request(app)
        .put(`/blogs/${blog._id}`)
        .send(updatedBlog)
        .expect(200);

      expect(res.body.message).toBe('Blog updated successfully');
      expect(res.body.blog.title).toBe(updatedBlog.title);
      expect(res.body.blog.body).toBe(updatedBlog.body);
    });

    it('should return 404 if blog not found', async () => {
      const res = await request(app)
        .put('/blogs/invalidid')
        .send({ title: 'Updated Blog' })
        .expect(404);

      expect(res.body.error).toBe('Blog not found');
    });
  });

  describe('DELETE /blogs/:id', () => {
    it('should delete a blog', async () => {
      const blog = await Blog.create({
        title: 'Test Blog',
        body: 'This is a test blog body by Abiodun Adekunle',
        reading_time: 1,
        author: 'testauthorid',
        description: 'This is the blog',
        status: 'published'
      });

      const res = await request(app)
        .delete(`/blogs/${blog._id}`)
        .expect(204);

      expect(res.body).toEqual({});
    });

    it('should return 404 if blog not found', async () => {
      const res = await request(app)
        .delete('/blogs/invalidid')
        .expect(404);

      expect(res.body.error).toBe('Blog not found');
    });
  });
});