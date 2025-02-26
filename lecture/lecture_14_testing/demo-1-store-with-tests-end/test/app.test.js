import { assert } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Static Server', function() {
    it('should return index.html if it is requested', async function(){
        const res = await request(app).get("/index.html")

        assert.equal(res.statusCode, 200)

        assert.include(
            res.text,
            `<html>`,
            "body has code we recognize from index.html"
        )
    })
    it('should return 404 for non-existent files', async function(){
        const res = await request(app).get("/;lkasdflkjsaf;lkja.html")
        assert.equal(res.statusCode, 404)
    })
})