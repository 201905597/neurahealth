-- Insertando algunos registros para que la BBDD no esté vacía

INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10001,'Claudia Blanco','claublanco10001','password1','claudiab@gmail.com',20001);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10002,'Miriam Colino','miriamcolino10002','password2','miriamcol@hotmail.com',20001);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10003,'Serena Blanco','serenablanco10003','password1','serenab3@gmail.com',0);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10004,'María García','mariagarcia10004','password2','mariagarcia45@hotmail.com',0);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10005,'Fernando García','fernandogarcia10005','password2','fergarcia@hotmail.com',20002);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10006,'Carla Verde','carlaverde10006','password2','carla.verde@hotmail.com',20003);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10007,'Javier López','javierlpz10007','password2','javilopez@hotmail.com',20003);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10008,'María Jesús García','mjesus10008','password2','mjgarcia@gmail.com',20003);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,USER_EMAIL,ID_PSIC) VALUES (10009,'Raúl Blanco','raulito10009','password2','raulito9@hotmail.com',20003);

INSERT INTO PSICOLOGOS (ID,PSIC_DATA,PSIC_NAME,PSIC_PWD,EMPLOYER_ID) VALUES (20001,'Marina Pérez','marina20001','password4',30001);
INSERT INTO PSICOLOGOS (ID,PSIC_DATA,PSIC_NAME,PSIC_PWD,EMPLOYER_ID) VALUES (20002,'Carla García','carla20002','password5',0);
INSERT INTO PSICOLOGOS (ID,PSIC_DATA,PSIC_NAME,PSIC_PWD,EMPLOYER_ID) VALUES (20003,'Carla Auñón','carla20003','password5',0);
INSERT INTO PSICOLOGOS (ID,PSIC_DATA,PSIC_NAME,PSIC_PWD,EMPLOYER_ID) VALUES (20004,'Mario González','mario20004','password4',30002);
INSERT INTO PSICOLOGOS (ID,PSIC_DATA,PSIC_NAME,PSIC_PWD,EMPLOYER_ID) VALUES (20005,'Pedro Samaniego','pedrosa20005','password4',30002);

INSERT INTO CENTROS(EMPLOYER_ID,EMPLOYER_NAME,POSTAL_CODE) VALUES (30001,'Centro de Salud de Vva del Pardillo',28229);
INSERT INTO CENTROS(EMPLOYER_ID,EMPLOYER_NAME,POSTAL_CODE) VALUES (30002,'Centro de Salud de Majadahonda',28220);

INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40001,'triste',TO_DATE('2022-04-30', 'yyyy-mm-dd'),10001);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40002,'triste',TO_DATE('2022-05-01', 'yyyy-mm-dd'),10001);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40003,'cansado',TO_DATE('2022-05-02', 'yyyy-mm-dd'),10001);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40004,'estresado',TO_DATE('2022-05-03', 'yyyy-mm-dd'),10001);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40005,'cansado',TO_DATE('2022-05-02', 'yyyy-mm-dd'),10002);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40006,'triste',TO_DATE('2022-05-03', 'yyyy-mm-dd'),10002);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40007,'estresado',TO_DATE('2022-05-02', 'yyyy-mm-dd'),10003);
INSERT INTO EMOTIONDATES(ID,EMOTION_NAME,FECHA,USER_ID) VALUES (40008,'estresado',TO_DATE('2022-05-03', 'yyyy-mm-dd'),10003);

INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El poder de confiar en ti','Curro Cañete',TO_DATE('2019-03-19', 'yyyy-mm-dd'),'triste');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('Ser feliz y vencer las preocupaciones','Albert Ellis',TO_DATE('2018-05-29', 'yyyy-mm-dd'),'triste');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('La auténtica felicidad','Martin Seligman',TO_DATE('2002-08-27', 'yyyy-mm-dd'),'triste');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El mal dormir','David Jiménez Torres',TO_DATE('2022-01-24', 'yyyy-mm-dd'),'cansado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('La cura para la fatiga','Dr. Sohere Roked',TO_DATE('2015-04-14', 'yyyy-mm-dd'),'cansado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('La magia del descanso','Mariluz de la Parra Cervantes',TO_DATE('2020-10-18', 'yyyy-mm-dd'),'cansado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El Pequeño Libro del Mindfulness','Patricia Collard',TO_DATE('2016-02-23', 'yyyy-mm-dd'),'estresado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El poder del ahora','Eckhart Tolle',TO_DATE('2013-01-01', 'yyyy-mm-dd'),'estresado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El juego interior del estrés','Timothy Gallwey',TO_DATE('2013-01-04', 'yyyy-mm-dd'),'estresado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('Ikigai: Los secretos de Japón para una vida larga y feliz','Héctor García y Francesc Miralles',TO_DATE('2016-03-07', 'yyyy-mm-dd'),'feliz');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El Algoritmo de la Felicidad','Mo Gawdat',TO_DATE('2018-08-14', 'yyyy-mm-dd'),'feliz');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('Un mundo feliz','Aldous Huxley',TO_DATE('2003-03-31', 'yyyy-mm-dd'),'feliz');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El poder de los hábitos','Charles Duhigg',TO_DATE('2012-05-07', 'yyyy-mm-dd'),'productivo');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('Hazlo ahora','Neil Fiore',TO_DATE('2011-01-13', 'yyyy-mm-dd'),'productivo');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('La Guerra del Arte','Steven Pressfield',TO_DATE('2013-06-03', 'yyyy-mm-dd'),'productivo');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('El libro que tu cerebro no quiere leer','David del Rosario',TO_DATE('2019-03-18', 'yyyy-mm-dd'),'enfadado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('Si te pierdes, mira dentro','Adela Sanz',TO_DATE('2019-11-14', 'yyyy-mm-dd'),'enfadado');
INSERT INTO LIBROS(TITULO,AUTOR,FECHA_PUB,EMOCION) VALUES ('Invisible (Nube de Tinta)','Eloy Moreno',TO_DATE('2018-02-01', 'yyyy-mm-dd'),'enfadado');
