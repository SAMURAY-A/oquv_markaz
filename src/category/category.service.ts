import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Course } from 'src/course/course.model';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Course) private readonly courseModel: typeof Course,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.findAll({
      include: [
        {
          model: Course,
        },
      ],
    });
  }

  findOne(id: number) {
    return this.categoryModel.findByPk(id, {
      include: [
        {
          model: Course,
        },
      ],
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [updated] = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`course with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  remove(id: number) {
    return this.categoryModel.destroy({ where: { id } });
  }

  async searchCourses(name: string) {
    try {
      const categories = await this.categoryModel.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`,
          },
        },
      });

      const courses = await this.courseModel.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`,
          },
        },
      });

      return [...categories, ...courses].map((obj) => {
        if (obj instanceof this.categoryModel) {
          return {
            id: obj.id,
            name: obj.name,
          };
        } else if (obj instanceof this.courseModel) {
          return {
            id: obj.id,
            name: obj.name,
            description: obj.description,
            price: obj.price,
            date_period: obj.date_period,
            daily_duration: obj.daily_duration,
            category_id: obj.category_id,
          };
        }
      });
    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error('Failed to search for courses.');
    }
  }
}
