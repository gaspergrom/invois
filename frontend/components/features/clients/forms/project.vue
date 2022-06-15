<template>
  <div class="flex">
    <main class="px-24 py-16">
      <section>
        <h3 class="text-h4 font-semibold pb-4">
          Project info
        </h3>

        <in-field title="Project name" class="mb-8">
          <in-input
            v-model="form.projectName"
            placeholder="Invois inc."
            autocomplete="no-complete"
            :error="$v.form.projectName.$dirty && $v.form.projectName.$invalid"
            @blur="$v.form.projectName.$touch()"
          />
          <in-field-message v-if="!$v.form.projectName.required && $v.form.projectName.$dirty">
            Please enter project name
          </in-field-message>
        </in-field>

        <div class="flex -mx-8">
          <div class="w-full md:w-1/2 px-8">
            <in-field title="Start Date" class="mb-8">
              <in-input-date
                v-model="form.startDate"
                :min="new Date().toISOString()"
                :max="form.endDate"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
          <div class="w-full md:w-1/2 px-8">
            <in-field title="End Date" class="mb-8">
              <in-input-date
                v-model="form.endDate"
                :min="form.startDate"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
        </div>
        <h3 class="text-h4 font-semibold pb-4 pt-24">
          Services
        </h3>
      </section>
    </main>
    <aside v-if="isEdit" class="py-24 px-16" />
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'nuxt-property-decorator';
import { required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import { Icons } from '~/components/shared/constants/icons';
import { Project } from '~/components/features/clients/Project.model';
import InInputDate from '~/components/shared/components/input-date.vue';
import { DATE_SERVICE } from '~/components/shared/services/date.service';
import {API_SERVICE} from "~/components/shared/services/api.service";

interface ProjectForm {
  client: string;
  projectName: string;
  startDate: Date | '';
  endDate: Date | '';
}

const initialForm: ProjectForm = {
  client: '',
  projectName: '',
  startDate: '',
  endDate: '',
};

@Component({
  name: 'in-client-form-project',
  components: {
    InInputDate,
    InFieldMessage,
    InInput,
    InField,
  },
  validations: {
    form: {
      projectName: {
        required,
      },
    },
  },
})
export default class ClientFormClient extends Vue {
  @Prop({ required: false }) project?: Project;

  d = DATE_SERVICE.instance;

  Icons = Icons;

  form: ProjectForm = {
    ...initialForm,
  };

  sending = false;

  @Watch('project', {
    immediate: true,
    deep: true,
  })
  onProjectChange(project: Project) {
    if (project) {
      this.fillForm(project);
    }
  }

  get isEdit(): boolean {
    return !!this.project;
  }

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    (this.isEdit && this.project
      ? API_SERVICE.projects.updateProject(this.project.id, {
        projectName: this.form.projectName,
        startDate: this.form.startDate || undefined,
        endDate: this.form.endDate || undefined,
      })
      : API_SERVICE.projects.createProject({
        projectName: this.form.projectName,
        startDate: this.form.startDate || undefined,
        endDate: this.form.endDate || undefined,
      }))
      .then(() => {
        this.$emit('close');
        this.reset();
        this.$invois.toast({
          title: 'Success',
          body: this.isEdit && this.project ? 'Project successfully updated!' : 'Project successfully created!',
        });
      })
      .catch(() => {
        this.$invois.toast({
          title: 'Error',
          body: this.isEdit && this.project ? 'There was an error updating project' : 'There was an error creating project',
        });
      })
      .finally(() => {
        this.sending = false;
      });
  }

  reset() {
    this.form = {
      ...initialForm,
    };
    this.$v.$reset();
  }

  fillForm(project: Project) {
    this.form = {
      ...initialForm,
      projectName: project.projectName || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
    };
  }
}
</script>
