import { createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    seeds(server) {
      server.db.loadData({
        cliente: [
          {
            id: 1,
            cnpj: "111111111111",
            nome: "Erick Barcelos",
            telefone: "91984211088",
            email: "petrick_barcelos@hotmail.com",
          },
          {
            id: 2,
            cnpj: "333333333333",
            nome: "Carlos Silva",
            telefone: "91984211000",
            email: "carlos.silva@example.com",
          },
          {
            id: 3,
            cnpj: "444444444444",
            nome: "Maria Oliveira",
            telefone: "91984211333",
            email: "maria.oliveira@example.com",
          },
          {
            id: 4,
            cnpj: "555555555555",
            nome: "João Fernandes",
            telefone: "91984211444",
            email: "joao.fernandes@example.com",
          },
          {
            id: 5,
            cnpj: "666666666666",
            nome: "Ana Souza",
            telefone: "91984211555",
            email: "ana.souza@example.com",
          },
        ],
        video: [
          {
            id: 1,
            titulo: "Teste",
            briefing: "Briefing de teste para o cliente Erick Barcelos",
            orcamento: "21215",
            entrega: "2024-03-01",
            idCliente: 1,
            status: "pendente",
          },
          {
            id: 2,
            titulo: "Vídeo Institucional",
            briefing: "Vídeo institucional para a empresa de Carlos Silva",
            orcamento: "30000",
            entrega: "2024-05-10",
            idCliente: 2,
            status: "concluído",
          },
          {
            id: 3,
            titulo: "Vídeo Promocional",
            briefing:
              "Vídeo promocional para a nova linha de produtos de Maria Oliveira",
            orcamento: "45000",
            entrega: "2024-06-20",
            idCliente: 3,
            status: "em andamento",
          },
          {
            id: 4,
            titulo: "Documentário",
            briefing:
              "Documentário sobre sustentabilidade produzido para João Fernandes",
            orcamento: "60000",
            entrega: "2024-07-15",
            idCliente: 4,
            status: "pendente",
          },
          {
            id: 5,
            titulo: "Vídeo Educacional",
            briefing:
              "Vídeo educacional para o programa de capacitação de Ana Souza",
            orcamento: "25000",
            entrega: "2024-08-01",
            idCliente: 5,
            status: "em andamento",
          },
        ],
        gerente: {
          email: "gerente@example.com",
          senha: "senhaSegura123",
        },
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/cliente", (schema) => {
        return schema.db.cliente;
      });

      this.get("/video", (schema) => {
        return schema.db.video;
      });

      this.get("/gerente", (schema) => {
        return schema.db.gerente;
      });

      this.post("/video", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.video.insert(attrs);
      });

      this.post("/cliente", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.cliente.insert(attrs);
      });

      this.put("/video/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let video = schema.db.video.find(id);

        return schema.db.video.update(video.id, newAttrs);
      });

      this.put("/cliente/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let cliente = schema.db.cliente.find(id);

        return schema.db.cliente.update(cliente.id, newAttrs);
      });

      this.delete("/video/:id", (schema, request) => {
        let id = request.params.id;
        return schema.db.video.remove(id);
      });

      this.delete("/cliente/:id", (schema, request) => {
        let id = request.params.id;
        return schema.db.cliente.remove(id);
      });
    },
  });

  return server;
}
