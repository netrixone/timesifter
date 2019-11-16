<template>
    <form class="form" @submit.prevent="onFormSubmit">
        <fieldset class="form-group"
                  v-bind:class="{ 'form-error': !inputValid, 'form-success': input.length}">
            <label for="convert-from-ts">From timestamp:</label>
            <input id="convert-from-ts"
                   class="form-control"
                   type="text"
                   v-model="input">
            <div class="help-block" v-for="error in errors">{{ error }}</div>
            <div class="help-block">Insert a non-negative 64-bit integer value as a decimal number,
                <br>0x-prefixed hexadecimal number<br>
                or space-separated hex byte array.
            </div>
        </fieldset>
        <fieldset class="form-group">
            <label for="convert-from-ts-output">Result:</label>
            <input id="convert-from-ts-output"
                   class="form-control"
                   type="text"
                   readonly="readonly"
                   v-model="output">
        </fieldset>
        <input type="submit"
               class="btn btn-primary btn-block"
               value="convert"
        >
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import * as microtime from '@/lib/microtime';

    @Component
    export default class NumberToStringConverter extends Vue {
        input: string = microtime.now().toString();
        output: string = '';
        errors: string[] = [];

        onFormSubmit() {
            this.output = '';
            this.errors = [];
            if (!microtime.isMicrotimeNumber(this.input)) {
                this.errors.push('Input not supported.');
                return;
            }

            this.output = microtime.toISOString(microtime.parseNumber(this.input));
        }

        get inputValid() {
            return microtime.isMicrotimeNumber(this.input);
        }
    }
</script>
