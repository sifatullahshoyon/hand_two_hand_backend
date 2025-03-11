import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;

  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;

    if (searchTerm && typeof searchTerm === 'string') {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      } as FilterQuery<T>);
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludingImportant = [
      'searchTerm',
      'page',
      'limit',
      'sortOrder',
      'sortBy',
      'fields',
    ];
    //  যেসব ফিল্ড আমাদের ফিল্টারিং এর জন্য দরকার নেই সেই সব ফিল্ডকে বাদ দেওয়া হচ্ছে।

    excludingImportant.forEach(key => delete queryObj[key]);

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;

    const limit = Number(this?.query?.limit) || 10;
    // skip = (page -1) * limit
    const skipped = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skipped).limit(limit);

    return this;
  }

  sort() {
    let sortStr;

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;

      const sortOrder = this?.query?.sortOrder;
      // "-price" অথবা "price"
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr);

    return this;
  }

  select() {
    let fields = '-__v';

    // jei jei field guloke dekhte cai
    if (this?.query?.fields) {
      fields = (this?.query.fields as string)?.split(',').join(' ');
    }

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
