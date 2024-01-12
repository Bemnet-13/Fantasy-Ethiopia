import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  let userId: string;
  let userEmail: string;
  let playerId: string;
  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });

  it('/auth/signup (POST)', async () => {
    const signUpDto = {
      username: 'Betty',
      email: 'admin2@fant.com',
      password: '123321',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signUpDto)
      .expect(201);

    expect(response.body.token).toBeDefined();

    
    userToken = response.body.token;
    userId = response.body.id;
    userEmail = signUpDto.email;
  });

  it('/auth/login (POST)', async () => {
    const loginDto = {
      email: userEmail,
      password: '123321', 
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);

    expect(response.body.token).toBeDefined();
    userToken = response.body.token;
  });

  it('/auth (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/auth (PUT)', async () => {
    const updateUserDto = {
      firstName: 'AdminUpdated',
      lastName: 'NotUser',
    };

    const response = await request(app.getHttpServer())
      .put('/auth')
      .set('Authorization', `Bearer ${userToken}`)
      .send(updateUserDto)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/auth (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/auth')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/players (POST)', async () => {
    const playerDto = {
      name: 'Adane Girma',
      club: 'Ethio-Bunna',
      Score: 10
    };

    const response = await request(app.getHttpServer())
      .post('/players')
      .set('Authorization', `Bearer ${userToken}`)
      .send(playerDto)
      .expect(201 );

    expect(response.body).toBeDefined();
    playerId = response.body.id;
  });

  it('/players (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/players')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/players/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/players/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      

    expect(response.body).toBeDefined();
  });

  it('/players/team (POST)', async () => {
    const teamDto = {
      id: userId,
    };

    const response = await request(app.getHttpServer())
      .post('/players/team')
      .set('Authorization', `Bearer ${userToken}`)
      .send(teamDto)

    expect(response.body).toBeDefined();
  });

  it('/players/team (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/players/team')
      .set('Authorization', `Bearer ${userToken}`)
      

    expect(response.body).toBeDefined();
  });

  it('/players/:id (PUT)', async () => {
    const updatePlayerDto = {
      name: 'Updated Player',
      club: 'Updated_Club',
      Score: 150,
    };

    const response = await request(app.getHttpServer())
      .put(`/players/${playerId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatePlayerDto)
      

    expect(response.body).toBeDefined();
  });

  it('/players/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/players/${playerId}`)
      .set('Authorization', `Bearer ${userToken}`)
      

    expect(response.body).toBeDefined();
  });
});
