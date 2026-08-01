import { Button } from '@/shared/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog';
import { Field, FieldError, FieldLabel } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';
import { toast } from '@/shared/ui/shadcn/sonner';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { PasswordRequirements } from '@/shared/ui/password-requirements/PasswordRequirements';
import { useChangePasswordMutation } from '@/entities/user';
import { createNewPasswordSchema } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const createFormSchema = (t: (key: string) => string) =>
  z.object({
    current_password: z.string().min(1, t('currentPasswordRequired')),
    new_password: createNewPasswordSchema(t),
    confirm_password: z.string().min(1, t('confirmPasswordRequired')),
  }).refine((data) => data.new_password === data.confirm_password, {
    message: t('passwordMismatch'),
    path: ['confirm_password'],
  });

type PasswordChangeFormValues = z.infer<ReturnType<typeof createFormSchema>>;

interface PasswordChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordChangeDialog = ({ open, onOpenChange }: PasswordChangeDialogProps) => {
  const { t } = useTranslation('user');
  const { t: tc } = useTranslation('common');
  const changePasswordMutation = useChangePasswordMutation();

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(createFormSchema(t)),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    }
  }, [open, form]);

  const onSubmit = (values: PasswordChangeFormValues) => {
    changePasswordMutation.mutate(
      {
        current_password: values.current_password,
        new_password: values.new_password,
        new_password_confirm: values.confirm_password,
      },
      {
        onSuccess: () => {
          toast.success(t('passwordChangeSuccess'));
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || t('passwordChangeError'));
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('passwordChange')}</DialogTitle>
          <DialogDescription>{t('passwordChangeDescription')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <Controller
              control={form.control}
              name='current_password'
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    <Lock className='h-4 w-4 text-muted-foreground inline-block' />
                    {t('currentPassword')}
                    <span className='text-destructive ml-0.5'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    type='password'
                    placeholder={t('currentPasswordPlaceholder')}
                  />
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='new_password'
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    <KeyRound className='h-4 w-4 text-muted-foreground inline-block' />
                    {t('newPassword')}
                    <span className='text-destructive ml-0.5'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    type='password'
                    placeholder={t('newPasswordPlaceholder')}
                  />
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  <PasswordRequirements password={field.value} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='confirm_password'
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    <ShieldCheck className='h-4 w-4 text-muted-foreground inline-block' />
                    {t('confirmPassword')}
                    <span className='text-destructive ml-0.5'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    type='password'
                    placeholder={t('confirmPasswordPlaceholder')}
                  />
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                </Field>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={changePasswordMutation.isPending}
            >
              {tc('cancel')}
            </Button>
            <Button
              type='submit'
              disabled={changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending && <Spinner />}
              {changePasswordMutation.isPending ? tc('processing') : tc('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { PasswordChangeDialog };
