BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(127) NOT NULL,
    [email] VARCHAR(127) NOT NULL,
    [password] VARCHAR(127) NOT NULL,
    [role] INT NOT NULL CONSTRAINT [users_role_df] DEFAULT 1,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF__users__created_a__6477ECF3] DEFAULT CURRENT_TIMESTAMP,
    [update_at] DATETIME NOT NULL CONSTRAINT [DF__users__update_at__656C112C] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__users__3213E83F65745477] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
