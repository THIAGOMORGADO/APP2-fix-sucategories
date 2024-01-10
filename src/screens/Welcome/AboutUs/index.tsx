import React from 'react';
import { ScrollView } from 'react-native';

import { Container, TextView, Paragraph } from './styles';

const paragraphs = {
  aboutus: [
    [
      'Foco no Cliente',
      'Nós cuidamos dos nossos clientes como parceiros/sócios/colaboradores e concentramo-nos em atender as suas necessidades e interesses, trabalhando implacavelmente para os satisfazer diariamente.',
    ],
    [
      'Equipe/Time',
      'Para nós, 1+1=3! Acreditamos que o grupo é maior e melhor do que a soma de suas partes e estamos conscientes de que a coordenação coletiva almeja/precede resultados positivos.',
    ],
    [
      'Inovação',
      'Implementamos as melhores práticas e soluções empresariais de modo a providenciarmos sempre um serviço de alta qualidade.',
    ],
    [
      'Dinamismo e Excelência',
      'Nós investimos em jovens capazes e dinâmicos que não têm medo de falhar. Somos ambiciosos com os nossos objetivos e desenvolvemos as capacidades necessárias para que consigamos atingi-los com determinação, qualidade e precisão.',
    ],
    [
      'Segurança e Confiabilidade',
      'Nós seguimos os princípios da integridade e ética na relação com todos os nossos sócios e parceiros. Reconhecemos a confiança e preferência depositada em nós pelos nossos parceiros e clientes, e, trabalhamos intensamente para superar as suas expectativas.',
    ],
    [
      'Responsabilidade social',
      'Estamos focados nas comunidades em que operamos e queremos participar da mudança e evolução dessas comunidades. Por essa razão, criamos um programa que poderá superar essas necessidades, envolvendo diretamente a comunidade através da tecnologia, em um sistema de doação simples e transparente.',
    ],
    [
      'A Nossa Equipe/Time',
      'A FIELD RIGHT é composta por uma equipe apaixonada de engenheiros, designers, operadores e especialistas em crescimento, e possui sedes no Brasil e na Angola. A empresa foi fundada por Alexandre Sergio Manganda, no ano de 2017.',
    ],
    [
      'MOVA O SEU NEGÓCIO PARA FRENTE',
      'Não é de se admirar que centenas de comerciantes e produtores trabalhem com a FIELD RIGHT no mundo, para fornecer entregas locais. Aproxime-se da maior rede de entrega sob demanda do país e comece a levar os produtos que os seus clientes amam em questão de minutos.',
    ],
    [
      'Expanda as suas vendas ',
      'Alcance clientes em novos bairros por toda a cidade e em outros locais do país.',
    ],
    [
      'Ganhe Novos Clientes',
      'Aumente a sua visibilidade com uma loja digital personalizada.',
    ],
    [
      'Faça o seu negócio ganhar escala no faturamento',
      'Em média, as empresas e os produtores registram um aumento de aproximadamente dez vezes nas suas receitas, após a parceria com a FIELD RIGHT.',
    ],
    [
      'A EXPERIÊNCIA FIELD RIGHT',
      'Nós entendemos que quando se trata da sua marca, a experiência do cliente é fundamental: é por isso que lidamos com todos os detalhes – de examinar cuidadosamente os nossos motoristas para garantir que o seu produto seja entregue de forma fresca e oportuna.',
      'Receba/Tenha refeições frescas e entregues em seu escritório.',
      'Com a FIELD RIGHT é fácil encomendar, a partir escritório, dos restaurantes locais que disponham dos serviços de entrega e de venda mediante retirada do consumidor.',
    ],
    [
      'Gaste Menos',
      'Sem contrato. Sem taxa de serviço.',
      'Pague apenas pelo que você encomendou.',
      'Controle as suas encomendas',
      'Agende com antecedência os seus pedidos.',
      'Altere o número de refeições para as próximas encomendas.',
      'Repita o seu último pedido com mais facilidade.',
      'Salve os seus estabelecimentos fornecedores favoritos.',
      'Receba um Atendimento ao Cliente Especial.',
      'Complete o formulário de contato, e nós entraremos em contato.',
    ],
  ],
};

export const AboutUs: React.FC = () => {
  return (
    <ScrollView>
      <Container>
        <TextView>
          {paragraphs.aboutus.map((arr) =>
            arr.map((txt, index) => (
              <Paragraph key={index} bold={index === 0}>
                {`\t${txt}`}
              </Paragraph>
            ))
          )}
        </TextView>
      </Container>
    </ScrollView>
  );
};
