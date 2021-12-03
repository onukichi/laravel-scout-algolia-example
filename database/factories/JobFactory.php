<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $jobCategoryId = rand(1, 5);
        $jobCategory = \App\Models\JobCategory::find($jobCategoryId);

        return [
            'job_category_id' => rand(1, 5),
            'name' => 'グローバルエンジニア組織の'.$jobCategory->name.'募集！',
            'description' => '国境・所属・職種・技術などの「壁」を乗り越え、0→1スタートアップにチャレンジする技術者「スタートアップ・エンジニア」を定義し、一人一人の価値を最大限に高め、日本から世界へエンジニアを輩出していく仕組みを作ります。',
        ];
    }
}
