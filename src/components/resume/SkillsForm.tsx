
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from 'lucide-react';

interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

interface SkillsFormProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newSkillInputs, setNewSkillInputs] = useState<{[key: string]: string}>({});

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      category: '',
      items: []
    };
    onChange([...data, newCategory]);
  };

  const updateCategory = (id: string, category: string) => {
    const updated = data.map(skill =>
      skill.id === id ? { ...skill, category } : skill
    );
    onChange(updated);
  };

  const addSkillItem = (categoryId: string) => {
    const skillText = newSkillInputs[categoryId]?.trim();
    if (!skillText) return;

    const updated = data.map(skill =>
      skill.id === categoryId 
        ? { ...skill, items: [...skill.items, skillText] }
        : skill
    );
    onChange(updated);
    setNewSkillInputs(prev => ({ ...prev, [categoryId]: '' }));
  };

  const removeSkillItem = (categoryId: string, skillIndex: number) => {
    const updated = data.map(skill =>
      skill.id === categoryId
        ? { ...skill, items: skill.items.filter((_, index) => index !== skillIndex) }
        : skill
    );
    onChange(updated);
  };

  const removeCategory = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === 'Enter') {
      addSkillItem(categoryId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Skills</h3>
        <Button onClick={addSkillCategory} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {data.map((skillCategory) => (
        <Card key={skillCategory.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Skill Category</CardTitle>
              <Button
                onClick={() => removeCategory(skillCategory.id)}
                variant="ghost"
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={skillCategory.category}
                onChange={(e) => updateCategory(skillCategory.id, e.target.value)}
                placeholder="e.g., Programming Languages, Design Tools, etc."
              />
            </div>

            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkillInputs[skillCategory.id] || ''}
                  onChange={(e) => setNewSkillInputs(prev => ({ 
                    ...prev, 
                    [skillCategory.id]: e.target.value 
                  }))}
                  onKeyPress={(e) => handleKeyPress(e, skillCategory.id)}
                  placeholder="Add a skill and press Enter"
                />
                <Button
                  onClick={() => addSkillItem(skillCategory.id)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button
                      onClick={() => removeSkillItem(skillCategory.id, index)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No skills added yet</p>
            <Button onClick={addSkillCategory} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill Category
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillsForm;
