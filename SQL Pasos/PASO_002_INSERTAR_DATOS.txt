
use DBREACT_VENTA
GO

--INSERTAR ROLES
insert into Rol(descripcion,esActivo) values ('Administrador',1)
insert into Rol(descripcion,esActivo) values ('Empleado',1)

go

--INSERTAR USUARIO
INSERT INTO Usuario(nombre,correo,telefono,idRol,clave,esActivo) values
('admin','admin@gmail.com','444333',1,'123',1),
('user','user@gmail.com','555666',2,'123',1)


go
--INSERTAR CATEGORIAS
insert into Categoria(descripcion,esActivo) values ('Laptops',1)
insert into Categoria(descripcion,esActivo) values ('Monitores',1)
insert into Categoria(descripcion,esActivo) values ('Teclados',1)
insert into Categoria(descripcion,esActivo) values ('Auriculares',1)
insert into Categoria(descripcion,esActivo) values ('Memorias',1)
insert into Categoria(descripcion,esActivo) values ('Accesorios',1)
go


insert into Producto(codigo,marca,descripcion,idCategoria,stock,precio,esActivo) values
('101010','samsung','laptop samsung book pro',1,20,2500,1),
('101011','lenovo','laptop lenovo idea pad',1,30,2200,1),
('101012','asus','laptop asus zenbook duo',1,30,2100,1),
('101013','teros','monitor teros gaming te-2',2,25,1050,1),
('101014','samsung','monitor samsung curvo',2,15,1400,1),
('101015','huawei','monitor huawei gamer',2,10,1350,1),
('101016','seisen','teclado seisen gamer',3,10,800,1),
('101017','antryx','teclado antryx gamer',3,10,1000,1),
('101018','logitech','teclado logitech',3,10,1000,1),
('101019','logitech','auricular logitech gamer',4,15,800,1),
('101020','hyperx','auricular hyperx gamer',4,20,680,1),
('101021','redragon','auricular redragon rgb',4,25,950,1),
('101022','kingston','memoria kingston rgb',5,10,200,1),
('101023','cooler master','ventilador cooler master',6,20,200,1),
('101024','lenovo','mini ventilador lenono',6,15,200,1)

go

insert into NumeroDocumento(id) values(0)
