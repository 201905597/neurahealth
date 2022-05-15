-- Insertando algunos registros para que la BBDD no esté vacía

INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10001,'Claudia Blanco','claublanco10001','password1',20001);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10002,'Miriam Colino','miriamcolino10002','password2',20001);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10003,'Serena Blanco','serenablanco10003','password1',0);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10004,'María García','mariagarcia10004','password2',0);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10005,'Fernando García','fernandogarcia10005','password2',20002);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10006,'Carla Verde','carlaverde10006','password2',20003);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10007,'Javier López','javierlpz10007','password2',20003);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10008,'María Jesús García','mjesus10008','password2',20003);
INSERT INTO USUARIOS (ID,USER_DATA,USER_NAME,USER_PWD,ID_PSIC) VALUES (10009,'Raúl Blanco','raulito10009','password2',20003);

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

