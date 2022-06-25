USE [master]
GO

/****** Object:  Database [poolERM]    Script Date: 9/25/2021 1:04:12 PM ******/
CREATE DATABASE [poolERM]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'poolERM', FILENAME = N'/var/opt/mssql/data/poolERM.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'poolERM_log', FILENAME = N'/var/opt/mssql/data/poolERM_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [poolERM].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [poolERM] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [poolERM] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [poolERM] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [poolERM] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [poolERM] SET ARITHABORT OFF 
GO

ALTER DATABASE [poolERM] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [poolERM] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [poolERM] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [poolERM] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [poolERM] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [poolERM] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [poolERM] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [poolERM] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [poolERM] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [poolERM] SET  DISABLE_BROKER 
GO

ALTER DATABASE [poolERM] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [poolERM] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [poolERM] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [poolERM] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [poolERM] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [poolERM] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [poolERM] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [poolERM] SET RECOVERY FULL 
GO

ALTER DATABASE [poolERM] SET  MULTI_USER 
GO

ALTER DATABASE [poolERM] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [poolERM] SET DB_CHAINING OFF 
GO

ALTER DATABASE [poolERM] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [poolERM] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [poolERM] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [poolERM] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [poolERM] SET QUERY_STORE = OFF
GO

ALTER DATABASE [poolERM] SET  READ_WRITE 
GO


use [poolERM]
CREATE TABLE poolERM.dbo.Clients ( 
	client_id            uniqueidentifier NOT NULL    ,
	name                 varchar(50) NOT NULL    ,
	CONSTRAINT PK_Clients PRIMARY KEY  ( client_id ) 
 );
GO

CREATE TABLE poolERM.dbo.Teanants ( 
	teanant_id           uniqueidentifier NOT NULL    ,
	name                 varchar(50) NOT NULL    ,
	CONSTRAINT PK_Teanants PRIMARY KEY  ( teanant_id ) 
 );
GO

CREATE TABLE poolERM.dbo.Tenant_Clients ( 
	tenant_client_id     uniqueidentifier NOT NULL    ,
	tenant_id            uniqueidentifier NOT NULL    ,
	client_id            uniqueidentifier NOT NULL    ,
	CONSTRAINT PK_Tenant_Clients PRIMARY KEY  ( tenant_client_id ) 
 );
GO

CREATE TABLE poolERM.dbo.Users ( 
	user_id              uniqueidentifier NOT NULL    ,
	email                varchar(100) NOT NULL    ,
	validated            tinyint     ,
	token                varbinary(50)     ,
	default_tenant       uniqueidentifier     ,
	CONSTRAINT PK_Users PRIMARY KEY  ( user_id ) 
 );
GO

CREATE TABLE poolERM.dbo.sysdiagrams ( 
	diagram_id           int NOT NULL   IDENTITY ,
	name                 sysname NOT NULL    ,
	principal_id         int NOT NULL    ,
	version              int     ,
	definition           varbinary(max)     ,
	CONSTRAINT PK__sysdiagr__C2B05B6193FB9A51 PRIMARY KEY  ( diagram_id ) ,
	CONSTRAINT UK_principal_name UNIQUE ( principal_id, name ) 
 );
GO

CREATE TABLE poolERM.dbo.Teanant_Users ( 
	tenant_user_id       uniqueidentifier NOT NULL    ,
	tenant_id            uniqueidentifier NOT NULL    ,
	user_id              uniqueidentifier NOT NULL    ,
	CONSTRAINT PK_Teanant_Users PRIMARY KEY  ( tenant_user_id ) 
 );
GO

ALTER TABLE poolERM.dbo.Teanant_Users ADD CONSTRAINT FK_Teanant_Users_Teanants FOREIGN KEY ( tenant_id ) REFERENCES poolERM.dbo.Teanants( teanant_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

ALTER TABLE poolERM.dbo.Teanant_Users ADD CONSTRAINT FK_Teanant_Users_Users FOREIGN KEY ( user_id ) REFERENCES poolERM.dbo.Users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

ALTER TABLE poolERM.dbo.Tenant_Clients ADD CONSTRAINT FK_Tenant_Clients_Clients FOREIGN KEY ( client_id ) REFERENCES poolERM.dbo.Clients( client_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

ALTER TABLE poolERM.dbo.Tenant_Clients ADD CONSTRAINT FK_Tenant_Clients_Teanants FOREIGN KEY ( tenant_id ) REFERENCES poolERM.dbo.Teanants( teanant_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

ALTER TABLE poolERM.dbo.Users ADD CONSTRAINT FK_Users_Teanants FOREIGN KEY ( default_tenant ) REFERENCES poolERM.dbo.Teanants( teanant_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
