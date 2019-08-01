import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: Repository<Article>,
  ) { }

  async create(articleDto: Article): Promise<Article> {
    const createdArticle = new Article();
    createdArticle.title = articleDto.title;
    createdArticle.author = articleDto.author;
    createdArticle.description = articleDto.description;
    createdArticle.content = articleDto.content;

    return await this.articleRepository.save(createdArticle);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async find(id: string): Promise<Article> {
    return await this.articleRepository.findOne(id);
  }

  async update(id: string, articleDto: Article): Promise<Article> {
    const updateArticle = await this.articleRepository.findOne(id);
    updateArticle.title = articleDto.title;
    updateArticle.author = articleDto.author;
    updateArticle.description = articleDto.description;
    updateArticle.content = articleDto.content;

    return await this.articleRepository.save(updateArticle);
  }

  async delete(id: string, articleDto: Article): Promise<Article> {
    const articleToRemove = await this.articleRepository.findOne(id);
    return await this.articleRepository.remove(articleToRemove);
  }
}
