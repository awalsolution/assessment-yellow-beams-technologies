import { HttpException } from '@/src/exceptions/HttpException';
import { Campaign } from '@/src/interfaces/campaign';
import { CampaignModel } from '@/src/models/campaigns';

export class CampaignService {
  static readonly instance = new CampaignService();
  async findAll(): Promise<Campaign[]> {
    const campaigns: Campaign[] = await CampaignModel.find();
    return campaigns;
  }
  async findById(id: string): Promise<Campaign> {
    const find: Campaign = await CampaignModel.findOne({ _id: id });
    if (!find) throw new HttpException(409, "Campaign doesn't exist");

    return find;
  }

  async create(data: Campaign): Promise<Campaign> {
    const find: Campaign = await CampaignModel.findOne({ name: data.name });
    if (find) throw new HttpException(409, `This Campaign ${data.name} already exists`);

    const createData: Campaign = await CampaignModel.create({ ...data });

    return createData;
  }

  async update(id: string, data: Campaign): Promise<Campaign> {
    if (data.name) {
      const find: Campaign = await CampaignModel.findOne({ name: data.name });
      if (find && find._id != id) throw new HttpException(409, `This Campaign ${data.name} already exists`);
    }

    const updateById: Campaign = await CampaignModel.findByIdAndUpdate(id, { data });
    if (!updateById) throw new HttpException(409, "Campaign doesn't exist");

    return updateById;
  }

  async delete(id: string): Promise<Campaign> {
    const deleteById: Campaign = await CampaignModel.findByIdAndDelete(id);
    if (!deleteById) throw new HttpException(409, "Campaign doesn't exist");

    return deleteById;
  }
}
