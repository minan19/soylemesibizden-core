export default {
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:postgres@localhost:5432/soylemesi_bizden?schema=public",
  },
};
